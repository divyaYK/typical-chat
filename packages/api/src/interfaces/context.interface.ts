/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import { IUserDocument } from "./user.interface";

export interface IGraphqlContext {
  req: Request;
  res: Response;
  CheckUser: (req: Request) => Promise<IUserDocument | boolean>;
}
