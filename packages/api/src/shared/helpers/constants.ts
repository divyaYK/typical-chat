/* eslint-disable no-unused-vars */
export const USER_TABLE = "users";
export const SPACE_TABLE = "spaces";
export const CHANNEL_TABLE = "channels";

export const enum GenericReturnMessage {
  SUCCESS = "SUCCESS",
  NOT_FOUND = "NOT_FOUND",
  SERVER_ERROR = "SERVER_ERROR",
}

export const enum VerificationMessage {
  LINK_EXPIRED = "LINK_EXPIRED",
  ALREADY_VERIFIED = "ALREADY_VERIFIED",
}

export const enum LoginMessage {
  NOT_VERIFIED = "NOT_VERIFIED",
}
