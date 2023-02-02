import { InternalServerError } from "helpers/errorHandler";
import { IUser } from "interfaces/user.interface";
import { BaseCache } from "./base.cache";

export class UserCache extends BaseCache {
  constructor() {
    super("UserCache");
  }

  public async saveUserToCache(
    key: string,
    userData: Omit<IUser, "password">,
  ): Promise<void> {
    const {
      _id, firstName, lastName, email, uId,
    } = userData;

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
      throw new InternalServerError(err);
    }
  }
}
