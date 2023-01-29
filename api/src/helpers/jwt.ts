/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { IUser } from "interfaces/user.interface";
import { redisConnection } from "services/db/redis";
import { config } from "../config";
import { Forbidden } from "./errorHandler";

const cookieOptions = Object.freeze({
  httpOnly: false,
  sameSite: "none",
  secure: true,
});

export const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: config.JWT_ACCESS_TOKEN_EXPIRES_IN! * 60 * 1000,
  expires: new Date(
    Date.now() + config.JWT_ACCESS_TOKEN_EXPIRES_IN! * 60 * 1000,
  ),
};

export const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: config.JWT_REFRESH_TOKEN_EXPIRES_IN! * 60 * 1000,
  expires: new Date(
    Date.now() + config.JWT_REFRESH_TOKEN_EXPIRES_IN! * 60 * 1000,
  ),
};

export const signJwt = (
  payload: { user: string },
  Key: string,
  options: any,
) => {
  const privateKey = Buffer.from((config as any)[Key], "base64").toString(
    "ascii",
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string, Key: string) => {
  try {
    const publicKey = Buffer.from((config as any)[Key], "base64").toString(
      "ascii",
    );
    const decoded = jwt.verify(token, publicKey);
    return decoded;
  } catch (error: any) {
    throw new Forbidden(error);
  }
};

export async function SignTokens(
  user: IUser,
): Promise<{ accessToken: string; refreshToken: string }> {
  // create a session in redis
  // TODO: change the fetching method
  const userId = `${user._id}`;
  await redisConnection.client.set(userId, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // create access token
  const accessToken = signJwt({ user: userId }, "JWT_ACCESS_PRIVATE_KEY", {
    expiresIn: `${config.JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
  });

  // create refresh token
  const refreshToken = signJwt({ user: userId }, "JWT_REFRESH_PRIVATE_KEY", {
    expiresIn: `${config.JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
  });

  return { accessToken, refreshToken };
}
