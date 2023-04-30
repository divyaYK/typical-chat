import { GraphQLError } from "graphql";
import { config } from "config";
import {
  accessTokenCookieOptions,
  signJwt,
  verifyJwt,
} from "shared/helpers/jwt";
import { logger } from "shared/helpers/logger";
import httpStatus from "http-status";
import { IGraphqlContext } from "interfaces/context.interface";
import userModel from "models/user";
import { redisConnection } from "services/db/redis";
import { mongoUserService } from "services/db/mongodb/user.service";

export const refreshAccessToken = async (
  _: unknown,
  __: unknown,
  context: IGraphqlContext,
) => {
  try {
    const { refresh_token } = context.req.cookies;

    const decoded = verifyJwt(refresh_token, "JWT_REFRESH_PUBLIC_KEY");
    if (!decoded) {
      throw new GraphQLError("Session expired, login again.", {
        extensions: {
          code: httpStatus.BAD_REQUEST,
        },
      });
    }

    // get session from redis
    const session = await redisConnection.client.get((decoded as any).user);

    const user = await mongoUserService.getUser(session!);

    if (!user || !user.verified) {
      throw new GraphQLError("User not verified", {
        extensions: {
          code: httpStatus.BAD_REQUEST,
        },
      });
    }

    const accessToken = signJwt(
      { user: user._id as unknown as string },
      "JWT_ACCESS_PRIVATE_KEY",
      {
        expiresIn: `${config.JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
      },
    );

    context.res.cookie("access_token", accessToken, accessTokenCookieOptions);
    context.res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      status: httpStatus[200],
      access_token: accessToken,
    };
  } catch (err: any) {
    logger.error(err);
    throw new GraphQLError("Error occurred", {
      extensions: {
        code: httpStatus.INTERNAL_SERVER_ERROR,
      },
    });
  }
};
