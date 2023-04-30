import { IUserDocument, TUser } from "interfaces/user.interface";
import tokenModel from "models/tokens";
import userModel from "models/user";
import { HydratedDocument } from "mongoose";
import crypto from "crypto";

class MongoAuthService {
  public async checkIfUserExists(email: string): Promise<boolean> {
    const user = await userModel.findOne({ email });
    if (!user) return false;
    return true;
  }
  public async createUser(
    userDataForCache: TUser,
  ): Promise<Omit<TUser, "password">> {
    const user: HydratedDocument<IUserDocument> = await userModel.create({
      ...userDataForCache,
    });
    const { password: userPassword, ...userDetails } = user;
    return userDetails;
  }
  public async getToken(userId: string): Promise<string> {
    let verificationToken = "";
    const tokenExists = await tokenModel.findOne({ userId });
    if (!tokenExists) {
      verificationToken = crypto.randomBytes(64).toString("hex");
      await tokenModel.create({
        token: verificationToken,
        userId,
        createdAt: new Date(),
      });
    } else {
      verificationToken = tokenExists.token;
    }
    return verificationToken;
  }
}

export const mongoAuthService: MongoAuthService = new MongoAuthService();
