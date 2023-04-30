import { GraphQLError } from "graphql";
import { Request } from "express";
import { logger } from "shared/helpers/logger";
import { IUserDocument } from "interfaces/user.interface";
import httpStatus from "http-status";

const checkIsLoggedIn = async (
  req: Request,
  // eslint-disable-next-line no-unused-vars
  CheckUser: (req: Request) => Promise<IUserDocument | boolean>,
) => {
  try {
    const authUser = await CheckUser(req);

    if (!authUser) {
      throw new GraphQLError("Unauthorized", {
        extensions: {
          code: httpStatus.UNAUTHORIZED,
        },
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export default checkIsLoggedIn;
