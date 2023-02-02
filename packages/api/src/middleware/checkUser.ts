/* eslint-disable camelcase */
import { ForbiddenError } from "apollo-server-core";
import { Request } from "express";
import { InternalServerError } from "helpers/errorHandler";
import { verifyJwt } from "helpers/jwt";
import { logger } from "helpers/logger";
import { IUserDocument } from "interfaces/user.interface";
import userModel from "models/user";

const CheckUser = async (req: Request): Promise<IUserDocument | boolean> => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // eslint-disable-next-line prefer-destructuring
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      const { access_token: token } = req.cookies;
      access_token = token;
    }

    if (!access_token) return false;
    const decoded = verifyJwt(access_token, "JWT_ACCESS_PUBLIC_KEY");

    if (!decoded) return false;

    const user = await userModel
      .findById((decoded as any).user)
      .select("+verified -password");

    if (!user || !user.verified) {
      throw new ForbiddenError("User does not exist");
    }

    return user;
  } catch (error: any) {
    logger.error(error);
    throw new InternalServerError(error);
  }
};

export default CheckUser;
