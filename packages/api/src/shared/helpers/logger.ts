import { config } from "config";
import winston from "winston";

class Logger {
  public level: string;

  private transports: (
    | winston.transports.FileTransportInstance
    | winston.transports.ConsoleTransportInstance
  )[];

  constructor() {
    this.level = "debug";
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
    if (config.NODE_ENV !== "production") {
      this.transports.push(new winston.transports.Console());
    }
  }

  public loggerInstance(level?: string) {
    return winston.createLogger({
      level: level || this.level,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.errors({ stack: true }),
      ),
      handleExceptions: true,
      handleRejections: true,
      transports: this.transports,
    });
  }
}

export const logger = new Logger().loggerInstance();
