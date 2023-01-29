import express, {
  Application, NextFunction, Request, Response,
} from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import hpp from "hpp";
import { Server } from "socket.io";
import CookieParser from "cookie-parser";
import "express-async-errors";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { CustomError, IErrorResponse } from "helpers/errorHandler";
import { config } from "./config";
import graphqlServer from "./services/graphql";
import InitMongo from "./services/db/mongodb";
import { logger } from "./helpers/logger";

const CORS_OPTIONS = Object.freeze({
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:5684",
    "http://localhost:5173",
  ],
  credentials: true,
});

class APIServer {
  public app: Application;

  public httpServer: http.Server | undefined;

  constructor() {
    config.validateVariables();
    config.initCloudinary();

    this.app = express();
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(cors(CORS_OPTIONS));
    this.app.use(CookieParser());
    // this.app.use("/api/v1");
    if (config.NODE_ENV === "production") {
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
    this.httpServer = http.createServer(this.app);
  }

  private async socketSetup(): Promise<Server> {
    const io: Server = new Server(this.httpServer, {
      cors: {
        origin: `${config.CLIENT_URL}${config.PORT}`,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      },
    });
    const pubClient = createClient({ url: config.REDIS_HOST });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    return io;
  }

  public async config(): Promise<http.Server> {
    this.app.use(
      (
        error: IErrorResponse,
        req: Request,
        res: Response,
        next: NextFunction,
        // eslint-disable-next-line consistent-return
      ) => {
        logger.error(error);
        if (error instanceof CustomError) {
          return res.status(error.statusCode).json(error.serializeErrors());
        }
        next();
      },
    );
    await graphqlServer.start();
    graphqlServer.applyMiddleware({
      app: this.app,
      cors: CORS_OPTIONS,
    });
    InitMongo();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const socketIO = await this.socketSetup();
    // this.socketIOConnection(socketIO);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.httpServer!;
  }

  // private socketIOConnection(socketio: Server): void {}
}

const server = new APIServer();
server.config().then((httpServer) => {
  httpServer.listen(config.PORT, () => {
    logger.info(`🚀  Server ready at: ${config.PORT}`);
    logger.info(
      `🚀  Playground ready at: ${config.CLIENT_URL}${config.PORT}/graphql`,
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    // require("child_process").exec(
    //   `start ${config.CLIENT_URL}${config.PORT}/graphql`,
    // );
  });
});
