import { config } from "config";
import { logger } from "helpers/logger";
import mongoose from "mongoose";
import { redisConnection } from "./redis";

export default () => {
  const connect = () => {
    mongoose
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .connect(config.MONGO_URL!)
      .then(() => {
        logger.info("Mongodb connected successfully");
        redisConnection.connect();
      })
      .catch((err) => logger.error(JSON.stringify(err)));
  };
  connect();
  mongoose.connection.on("disconnected", connect);
};
