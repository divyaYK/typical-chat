import { config } from "config";
import { logger } from "shared/helpers/logger";
import { createClient } from "redis";
import { Logger } from "winston";

type RedisClient = ReturnType<typeof createClient>;

export abstract class BaseCache {
  client: RedisClient;

  log: Logger;

  constructor(cacheName: string) {
    this.client = createClient({ url: config.REDIS_HOST });
    this.log = logger;
    this.log.level = cacheName;
    this.cacheError();
  }

  private cacheError(): void {
    this.client.on("error", (err: unknown) => {
      this.log.error(err);
    });
  }
}
