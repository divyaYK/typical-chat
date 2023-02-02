/* eslint-disable no-underscore-dangle */
import { InternalServerError } from "helpers/errorHandler";
import { logger } from "helpers/logger";
import { IGraphqlContext } from "interfaces/context.interface";
import checkIsLoggedIn from "middleware/checkAuthentication";
import { redisConnection } from "services/db/redis";

export const logout = async (
  _: unknown,
  __: unknown,
  { req, res, CheckUser }: IGraphqlContext,
) => {
  try {
    await checkIsLoggedIn(req, CheckUser);

    const user = await CheckUser(req);

    // Delete the user's session
    if (typeof user !== "boolean") {
      await redisConnection.client.del(user._id as unknown as string);
    }

    // Logout user
    res.cookie("access_token", "", { maxAge: -1 });
    res.cookie("refresh_token", "", { maxAge: -1 });
    res.cookie("logged_in", "", { maxAge: -1 });

    return true;
  } catch (error) {
    logger.error(error);
    throw new InternalServerError(error);
  }
};
