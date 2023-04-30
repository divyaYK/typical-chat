import { IUserDocument, IUserDocumentMethods } from "interfaces/user.interface";
import userModel from "models/user";
import { HydratedDocument } from "mongoose";

class MongoUserService {
  public async getUserByEmail(
    email: string,
  ): Promise<HydratedDocument<IUserDocumentMethods, IUserDocument> | null> {
    const user: HydratedDocument<IUserDocumentMethods, IUserDocument> | null =
      await userModel.findOne({ email });
    return user;
  }

  public async getUser(session: string) {
    const user = await userModel.findById(JSON.parse(session!)._id);
    return user;
  }
}

export const mongoUserService: MongoUserService = new MongoUserService();
