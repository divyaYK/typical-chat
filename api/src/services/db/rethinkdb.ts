import { logger } from "helpers/logger";
import rethinkDb from "rethinkdb";

let rethinkDbConnection = null;

const connectRethinkDb = async function () {
  const connection = await rethinkDb.connect({
    host: process.env.RETHINKDB_HOST || "localhost",
    port: Number(process.env.RETHINKDB_PORT) || 28015,
    user: process.env.RETHINKDB_USERNAME || "admin",
    password: process.env.RETHINKDB_PASSWORD || "",
    db: process.env.RETHINKDB_NAME || "test",
  });

  connection.on("close", (e: CloseEvent) => {
    logger.info("Connection closed");
    console.info(e);
    rethinkDbConnection = null;
  });

  logger.info("Connection established");
  rethinkDbConnection = connection;
  return connection;
};
