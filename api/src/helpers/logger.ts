import winston from "winston";

class Logger {
  private transports: (
    | winston.transports.FileTransportInstance
    | winston.transports.ConsoleTransportInstance
  )[];
  constructor() {
    this.transports = [
      new winston.transports.File({
        filename: "error.log",
        level: "error",
      }),
      new winston.transports.File({
        filename: "combined.log",
        level: "verbose",
      }),
    ];
    if (process.env.NODE_ENV !== "production") {
      this.transports.push(new winston.transports.Console());
    }
  }

  public loggerInstance() {
    return winston.createLogger({
      level: "info",
      format: winston.format.json(),
      transports: this.transports,
    });
  }
}

export const logger = new Logger().loggerInstance();
