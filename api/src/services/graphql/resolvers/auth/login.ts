/* eslint-disable class-methods-use-this */
import { GenericReturnMessage, LoginMessage } from "helpers/constants";
import { NotFoundError, UnAuthorizedError } from "helpers/errorHandler";
import {
  SignTokens,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "helpers/jwt";
import { logger } from "helpers/logger";
import { LoginValidators } from "helpers/validators/login";
import { ValidationDecorator } from "helpers/validators/validationDecorator";
import httpStatus from "http-status";
import { ILoginInput } from "interfaces/auth.interface";
import { IGraphqlContext } from "interfaces/context.interface";
import { IUser, IUserDocument } from "interfaces/user.interface";
import userModel, { IUserDocumentMethods } from "models/user";
import { HydratedDocument } from "mongoose";

class LoginClass {
  @ValidationDecorator(LoginValidators)
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  private validateParams(_: ILoginInput) {
    return true;
  }

  private async findUser(input: ILoginInput) {
    const user: HydratedDocument<IUserDocumentMethods, IUserDocument> | null = await userModel
      .findOne({ email: input.email })
      .select("+password +verified");

    if (!user) {
      logger.error("User not found in the database");
      throw new NotFoundError("User does not exist");
    } else if (!user.verified) {
      return false;
    } else {
      return user;
    }
  }

  private async verifyCredentials(
    input: ILoginInput,
    user: HydratedDocument<IUserDocumentMethods, IUserDocument>,
  ) {
    const verifyPassword = await user.comparePasswords(
      input.password,
      user.password,
    );
    if (!verifyPassword) {
      logger.error("Invalid password");
      throw new UnAuthorizedError("Invalid password");
    }
    return true;
  }

  private async getTokens(user: IUser) {
    const { accessToken, refreshToken } = await SignTokens(user);
    return { accessToken, refreshToken };
  }

  public async loginResolver(
    _: unknown,
    { input }: { input: ILoginInput },
    context: IGraphqlContext,
  ) {
    // validate input parameters
    LoginClass.prototype.validateParams(input);

    // find user in cache or database
    const user = await LoginClass.prototype.findUser(input);

    if (!user) {
      return {
        status: httpStatus[400],
        accessToken: "",
        message: LoginMessage.NOT_VERIFIED,
      };
    }

    // verify password
    LoginClass.prototype.verifyCredentials(input, user);
    user.password = "";

    // issue tokens
    const userResult = {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      email: user.email,
      password: user.password,
      uId: user.uId,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
    };
    const { accessToken, refreshToken } = await LoginClass.prototype.getTokens(
      userResult,
    );
    context.res.cookie(
      "refresh_token",
      refreshToken,
      refreshTokenCookieOptions,
    );
    context.res.cookie("access_token", accessToken, accessTokenCookieOptions);
    context.res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      status: httpStatus[200],
      access_token: accessToken,
      message: GenericReturnMessage.SUCCESS,
    };
  }
}

export const { loginResolver } = new LoginClass();
