/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from "helpers/logger";
import { BaseCache } from "services/redis/base.cache";
import { Logger } from "winston";

const log: Logger = logger;
log.level = "redisConnection";

class RedisConnection extends BaseCache {
  constructor() {
    super("redisConnection");
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      log.info("Redis connection established");
    } catch (err) {
      log.error(err);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
