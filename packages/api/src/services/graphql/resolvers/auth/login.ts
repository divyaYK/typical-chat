import { GenericReturnMessage, LoginMessage } from "shared/helpers/constants";
import {
  SignTokens,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "shared/helpers/jwt";
import { logger } from "shared/helpers/logger";
import { LoginValidators } from "shared/validators/login";
import { ValidationDecorator } from "shared/validators/validationDecorator";
import httpStatus from "http-status";
import { ILoginInput } from "interfaces/auth.interface";
import { IGraphqlContext } from "interfaces/context.interface";
import {
  IUser,
  IUserDocument,
  IUserDocumentMethods,
} from "interfaces/user.interface";
import { HydratedDocument } from "mongoose";
import { GraphQLError } from "graphql";
import { mongoUserService } from "services/db/mongodb/user.service";

class LoginClass {
  @ValidationDecorator(LoginValidators)
  private validateParams(_: ILoginInput) {
    return true;
  }

  private async findUser(input: ILoginInput) {
    const user = await mongoUserService.getUserByEmail(input.email);

    if (!user) {
      logger.error("User not found in the database");
      throw new GraphQLError("User not found", {
        extensions: {
          code: httpStatus.NOT_FOUND,
        },
      });
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
      throw new GraphQLError("Invalid Credentials", {
        extensions: {
          code: httpStatus.BAD_REQUEST,
        },
      });
    }
    return true;
  }

  private async getTokens(user: IUser & { _id: string }) {
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
    const { accessToken, refreshToken } = await LoginClass.prototype.getTokens({
      ...user,
    });
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
