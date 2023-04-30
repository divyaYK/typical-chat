import express, { Application, Request } from "express";
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
import { config } from "./config";
import InitMongo from "./services/db/mongodb";
import { logger } from "shared/helpers/logger";
import { ApolloServer } from "@apollo/server";
import typeDefs from "services/graphql/schema";
import resolvers from "services/graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

interface ServerContext {
  token?: string;
}

/**
 * cors options for dev environment
 */
const CORS_OPTIONS = Object.freeze({
  origin: [
    "https://studio.apollographql.com",
    "http://localhost:5684",
    "http://localhost:5173",
  ],
  credentials: true,
});

/**
 * @class APIServer
 * @classdesc Class defined whose methods are used for initiating the server.
 */
class APIServer {
  /**
   * @memberof APIServer
   * @public
   * @name app
   * @description Express application
   */
  public app: Application;

  /**
   * @memberof APIServer
   * @public
   * @name httpServer
   * @description NodeJS HTTP server
   */
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

  /**
   * @private
   * @memberof APIServer
   * @description sets up the socket connection
   * @returns socket instance
   */
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

  /**
   * @private
   * @memberof APIServer
   * @description initializes the server
   * @returns httpServer
   */
  public async initialize(): Promise<http.Server> {
    const graphqlServer = new ApolloServer<ServerContext>({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer! }),
      ],
      includeStacktraceInErrorResponses: config.NODE_ENV === "development",
    });
    await graphqlServer.start();
    this.app.use(
      "/graphql",
      cors(CORS_OPTIONS),
      bodyParser.json(),
      expressMiddleware(graphqlServer, {
        context: async ({ req }: { req: Request }) => ({
          token: req.headers.token,
        }),
      }),
    );
    InitMongo();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const socketIO = await this.socketSetup();
    // this.socketIOConnection(socketIO);
    return this.httpServer!;
  }

  // private socketIOConnection(socketio: Server): void {}
}

/**
 * @constructs APIServer
 * @description Initializes the server and logs the url.
 */
const server = new APIServer();
server.initialize().then((httpServer) => {
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
