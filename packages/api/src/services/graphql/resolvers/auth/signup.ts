import { logger } from "shared/helpers/logger";
import { ISignUpInput } from "interfaces/auth.interface";
import { TUser } from "interfaces/user.interface";
import userModel from "models/user";
import mongoose from "mongoose";
import { ValidationDecorator } from "shared/validators/validationDecorator";
import { SignUpValidators } from "shared/validators/signup";
import { generateRandomIntegers } from "shared/helpers/generateRandomIntegers";
import { verifyEmailTemplate } from "services/email/templates/verifyEmail/handlers";
import { mailTransport } from "services/email/mail.transport";
import { mongoAuthService } from "services/db/mongodb/auth.service";
import { GraphQLError } from "graphql";
import httpStatus from "http-status";
import { redisAuthService } from "services/db/redis/auth.service";

/**
 * @class SignUp
 * @summary Resolver that handles the sign up process for users.
 * @description
 * - Checks if user already exists and throws an error.
 * - Saves user's data to redis cache and mongodb.
 */
class SignUpClass {
  /**
   * Validate input parameters.
   * @throws BadRequestError if validation fails.
   */
  @ValidationDecorator(SignUpValidators)
  private async validateParams(input: ISignUpInput) {
    return true;
  }

  /**
   * checks if the user exists in the database
   * @throws BadRequestError if user exists
   */

  private async checkIfUserExists(email: string) {
    const userExists = await mongoAuthService.checkIfUserExists(email);
    if (userExists) {
      logger.error("User already exists");
      throw new GraphQLError("User already exists", {
        extensions: {
          code: httpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // private async uploadAvatar(
  //   avatar: string,
  //   objectId: mongoose.Types.ObjectId,
  // ) {
  //   // Upload user's avatar to cloudinary server
  //   const uploadAvatar: UploadApiResponse = (await uploads(
  //     avatar,
  //     `${objectId}`,
  //     true,
  //     true,
  //   )) as UploadApiResponse;
  //   if (!uploadAvatar.public_id) {
  //     logger.error("couldn't upload avatar");
  //     throw new BadRequestError(
  //       "File upload: Error occurred while uploading avatar",
  //     );
  //   }
  //   return uploadAvatar;
  // }

  /**
   * Saves user to redis cache and mongodb database.
   */
  private async saveToCacheAndDb(userDataForCache: TUser) {
    // save user to cache
    await redisAuthService.createUser(userDataForCache);

    // create new user in db
    const userDetails = await mongoAuthService.createUser(userDataForCache);
    return userDetails;
  }

  private async sendConfirmationEmail(email: string, userId: string) {
    try {
      const verificationToken = await mongoAuthService.getToken(userId);
      const emailBody = await verifyEmailTemplate(
        `http://localhost:5174/email-verify?email=${email}&tk=${verificationToken}`,
      );
      const emailResult = await mailTransport.sendEmail(
        email,
        "verify your email",
        emailBody,
      );
      logger.info(JSON.stringify(emailResult));
    } catch (err) {
      logger.error(err);
      throw new GraphQLError(
        "Error occurred while sending confirmation email",
        {
          extensions: {
            code: httpStatus.INTERNAL_SERVER_ERROR,
          },
        },
      );
    }
  }

  /**
   * @function SignUpResolver
   * @summary used for signing up a user.
   * @param _ - unknown root resolver object: not needed
   * @param args - lends input variables of the sign up mutation.
   * @param context - lends GraphQL context object.
   * Here, it provides express request and response objects.
   * @returns Response object with user document.
   */
  public async signUpResolver(
    _: unknown,
    { input }: { input: ISignUpInput },
    __: unknown,
  ) {
    // validate first
    await SignUpClass.prototype.validateParams(input);

    // Check if user already signed up
    await SignUpClass.prototype.checkIfUserExists(input.email);

    // upload avatar to server
    const userId = new mongoose.Types.ObjectId();
    // const uploadAvatar = await SignUpClass.prototype.uploadAvatar(
    //   input.avatar,
    //   userId,
    // );

    // save user to cache and database
    const uId = `${generateRandomIntegers(12)}`;
    const userDataForCache: TUser = {
      _id: `${userId}`,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      verified: false,
      password: input.password,
      uId,
      // avatar: `https://res.cloudinary.com/${config.CLOUDINARY_CLOUD}/image/upload/v${uploadAvatar.version}/${userId}`,
    };
    const userResult = await SignUpClass.prototype.saveToCacheAndDb(
      userDataForCache,
    );

    // send confirmation email
    await SignUpClass.prototype.sendConfirmationEmail(input.email, `${userId}`);

    // return the user details
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const details = (userResult as unknown as any)._doc;
    return { ...details };
  }

  public async resendVerificationMail(
    _: unknown,
    { input }: { input: { email: string } },
    __: unknown,
  ) {
    const user = await userModel.findOne({ email: input.email });
    if (!user) {
      return {
        status: "NOT_FOUND",
      };
    }

    if (user.verified) {
      return {
        status: "ALREADY_VERIFIED",
      };
    }

    await SignUpClass.prototype.sendConfirmationEmail(
      user.email,
      `${user._id}`,
    );

    return {
      status: "SUCCESS",
    };
  }
}

export const signUpClass: SignUpClass = new SignUpClass();
