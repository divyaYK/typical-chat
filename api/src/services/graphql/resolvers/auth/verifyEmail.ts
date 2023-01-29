/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { VerifyEmailValidators } from "helpers/validators/verifyEmail";
import { ValidationDecorator } from "helpers/validators/validationDecorator";
import { IVerifyEmailInput } from "interfaces/auth.interface";
import { HydratedDocument, Types } from "mongoose";
import userModel, { IUserDocumentMethods } from "models/user";
import { IUserDocument } from "interfaces/user.interface";
import tokenModel from "models/tokens";
import { logger } from "helpers/logger";

class VerifyEmailClass {
  @ValidationDecorator(VerifyEmailValidators)
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  private validateParams(_: IVerifyEmailInput) {
    return true;
  }

  private async findUser(input: IVerifyEmailInput) {
    // eslint-disable-next-line operator-linebreak
    const user: HydratedDocument<IUserDocumentMethods, IUserDocument> | null =
      await userModel.findOne({ email: input.email });

    if (!user) {
      return false;
    }
    return user;
  }

  private async findToken(userId: string | Types.ObjectId, tk: string) {
    const token = await tokenModel.findOne({ userId });

    if (!token) {
      return false;
    }

    return token.token === tk;
  }

  public async verifyEmailResolver(
    _: unknown,
    { input }: { input: IVerifyEmailInput },
    __: unknown,
  ) {
    const VerificationStatus = {
      SUCCESS: "SUCCESS",
      NOT_FOUND: "NOT_FOUND",
      LINK_EXPIRED: "LINK_EXPIRED",
      SERVER_ERROR: "SERVER_ERROR",
      ALREADY_VERIFIED: "ALREADY_VERIFIED",
    };
    try {
      // validate input
      VerifyEmailClass.prototype.validateParams(input);

      // Check if user exists and get userId
      const userResult = await VerifyEmailClass.prototype.findUser(input);
      if (!userResult) {
        return {
          status: VerificationStatus.NOT_FOUND,
        };
      }

      if (userResult.verified) {
        return {
          status: VerificationStatus.ALREADY_VERIFIED,
        };
      }

      // find token and verify
      const checkTokenResult = await VerifyEmailClass.prototype.findToken(
        // eslint-disable-next-line no-underscore-dangle
        userResult._id,
        input.tk,
      );
      if (!checkTokenResult) {
        return {
          status: VerificationStatus.LINK_EXPIRED,
        };
      }
      const verifiedAction = await userModel.findByIdAndUpdate(userResult._id, {
        verified: true,
      });
      console.log(verifiedAction);
      return {
        status: VerificationStatus.SUCCESS,
      };
    } catch (err) {
      logger.error(err);
      return {
        status: VerificationStatus.SERVER_ERROR,
      };
    }
  }
}

export const { verifyEmailResolver } = new VerifyEmailClass();
