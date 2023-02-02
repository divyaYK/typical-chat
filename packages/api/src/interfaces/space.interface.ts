import { Types } from "mongoose";

/* eslint-disable no-unused-vars */
export enum SpaceMemberType {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum SpaceVisibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

export interface ISpace {
  adminId: string | Types.ObjectId;
  spaceName: string;
  spaceDescription?: string;
  visibility: SpaceVisibility;
}
