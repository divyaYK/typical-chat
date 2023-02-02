/* eslint-disable consistent-return */
import { Request } from "express";
import { UnAuthorizedError } from "helpers/errorHandler";
import { logger } from "helpers/logger";
import { IUserDocument } from "interfaces/user.interface";

const checkIsLoggedIn = async (
  req: Request,
  // eslint-disable-next-line no-unused-vars
  CheckUser: (req: Request) => Promise<IUserDocument | boolean>,
) => {
  try {
    const authUser = await CheckUser(req);

    if (!authUser) {
      return new UnAuthorizedError("You are not logged in");
    }
  } catch (error) {
    logger.error(error);
  }
};

export default checkIsLoggedIn;
