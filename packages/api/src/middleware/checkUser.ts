import { GraphQLError } from "graphql";
import { Request } from "express";
import { verifyJwt } from "shared/helpers/jwt";
import { logger } from "shared/helpers/logger";
import { IUserDocument } from "interfaces/user.interface";
import userModel from "models/user";
import httpStatus from "http-status";

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
      throw new GraphQLError("User does not exist", {
        extensions: {
          code: httpStatus.NOT_FOUND,
        },
      });
    }

    return user;
  } catch (error: any) {
    logger.error(error);
    throw new GraphQLError("Error occurred", {
      extensions: {
        code: httpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};

export default CheckUser;
