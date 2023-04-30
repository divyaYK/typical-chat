import { Document, Model } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string | undefined;
  email: string;
  avatar?: string;
  verified: boolean;
  password: string;
  uId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TUser = Omit<IUser, "createdAt" | "updatedAt"> & { _id: string };

export interface IUserDocumentMethods {
  comparePasswords(
    passwordToCheck: string,
    userPassword: string,
  ): Promise<boolean>;
}

export type TUserModel = Model<IUserDocument, object, IUserDocumentMethods>;

export interface IUserDocument extends Document, IUser {}
