import { GraphQLError } from "graphql";
import { logger } from "shared/helpers/logger";
import { IGraphqlContext } from "interfaces/context.interface";
import checkIsLoggedIn from "middleware/checkAuthentication";
import { redisConnection } from "services/db/redis";
import httpStatus from "http-status";

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
    throw new GraphQLError("User not found", {
      extensions: {
        code: httpStatus.NOT_FOUND,
      },
    });
  }
};
