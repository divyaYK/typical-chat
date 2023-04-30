import { TUser } from "interfaces/user.interface";
import { BaseCache } from "./base.cache";
import { GraphQLError } from "graphql/error";
import httpStatus from "http-status";

export class UserCache extends BaseCache {
  constructor() {
    super("UserCache");
  }

  public async saveUserToCache(
    key: string,
    userData: Omit<TUser, "password"> & { _id: string },
  ): Promise<void> {
    const { _id, firstName, lastName, email, uId } = userData;

    const redisList: string[] = [
      "_id",
      `${_id}`,
      "firstName",
      firstName,
      "lastName",
      `${lastName}`,
      "email",
      email,
      "uId",
      uId,
    ];
    try {
      if (!this.client.isOpen) {
        await this.client.connect();
      }
      await this.client.ZADD("user", { score: Number(uId), value: `${key}` });
      await this.client.HSET(`users:${key}`, redisList);
    } catch (err: any) {
      this.log.error(JSON.stringify(err));
      throw new GraphQLError("Error occurred during caching user", {
        extensions: {
          code: httpStatus.INTERNAL_SERVER_ERROR,
        },
      });
    }
  }
}
