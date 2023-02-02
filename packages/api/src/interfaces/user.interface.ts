import { Document } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string | undefined;
  email: string;
  avatar?: string;
  verified: boolean;
  password: string;
  uId: string;
}

export interface IUserDocument extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}
