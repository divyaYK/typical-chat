import { Document } from "mongoose";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISignUpInput extends ILoginInput {
  firstName: string;
  lastName: string;
}

export interface IAuthDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IVerifyEmailInput {
  email: string;
  tk: string;
}
