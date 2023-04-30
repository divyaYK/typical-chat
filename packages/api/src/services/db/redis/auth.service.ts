import { TUser } from "interfaces/user.interface";
import { UserCache } from "services/redis/user.cache";

class RedisAuthService {
  private userCache: UserCache = new UserCache();
  public async createUser(userDataForCache: TUser): Promise<void> {
    const { password, ...properties } = userDataForCache;
    await this.userCache.saveUserToCache(`${userDataForCache._id}`, properties);
  }
}

export const redisAuthService: RedisAuthService = new RedisAuthService();
