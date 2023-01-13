import express, { Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import CookieSession from "cookie-session";
import "express-async-errors";
import services from "./services";
import { logger } from "./helpers/logger";

dotenv.config();

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(
      CookieSession({
        name: "session",
        keys: ["session"],
        maxAge: 60 * 60 * 2,
        secure: false,
      }),
    );
    if (process.env.NODE_ENV === "production") {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(
        helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "*.amazonaws.com"],
          },
        }),
      );
      this.app.use(helmet.referrerPolicy({ policy: "same-origin" }));
    }
    this.app.use(compression());
  }

  public async config(): Promise<Application> {
    await services.graphql.start();
    services.graphql.applyMiddleware({ app: this.app });
    return this.app;
  }
}

const server = new Server();
server.config().then((app: Application) => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀  Server ready at: ${process.env.PORT}`);
    logger.info(`🚀  Server ready at: ${process.env.PORT}`);
    logger.info(
      `🚀  Playground ready at: http://localhost:${process.env.PORT}/graphql`,
    );
    require("child_process").exec(
      `start http://localhost:${process.env.PORT}/graphql`,
    );
  });
});
