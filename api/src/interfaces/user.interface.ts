import { Types } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string | undefined;
  email: string;
  avatar?: string;
  verified: boolean;
  _id: Types.ObjectId;
  password: string;
  uId: string;
}

export interface IUserDocument extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}
