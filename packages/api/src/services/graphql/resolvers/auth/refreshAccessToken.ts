/* eslint-disable no-underscore-dangle */
import { config } from "config";
import {
  BadRequestError,
  Forbidden,
  InternalServerError,
} from "helpers/errorHandler";
import { accessTokenCookieOptions, signJwt, verifyJwt } from "helpers/jwt";
import { logger } from "helpers/logger";
import httpStatus from "http-status";
import { IGraphqlContext } from "interfaces/context.interface";
import userModel from "models/user";
import { redisConnection } from "services/db/redis";

export const refreshAccessToken = async (
  _: unknown,
  __: unknown,
  context: IGraphqlContext,
) => {
  try {
    // eslint-disable-next-line camelcase
    const { refresh_token } = context.req.cookies;

    const decoded = verifyJwt(refresh_token, "JWT_REFRESH_PUBLIC_KEY");
    if (!decoded) {
      throw new Forbidden("Session expired. Login again.");
    }

    // get session from redis
    const session = await redisConnection.client.get((decoded as any).user);

    const user = await userModel
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .findById(JSON.parse(session!)._id)
      .select("+verified");

    if (!user || !user.verified) {
      throw new BadRequestError("User not verified.");
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
    throw new InternalServerError(err);
  }
};
