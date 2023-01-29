/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { BadRequestError, InternalServerError } from "helpers/errorHandler";
import { logger } from "helpers/logger";
import { ISignUpInput } from "interfaces/auth.interface";
import { IUser, IUserDocument } from "interfaces/user.interface";
import userModel from "models/user";
import mongoose, { HydratedDocument } from "mongoose";
import { checkIfUserExists } from "services/db/utils";
import { ValidationDecorator } from "helpers/validators/validationDecorator";
import { SignUpValidators } from "helpers/validators/signup";
import { UserCache } from "services/redis/user.cache";
import { generateRandomIntegers } from "helpers/generateRandomIntegers";
import crypto from "crypto";
import { verifyEmailTemplate } from "services/email/templates/verifyEmail/handlers";
import { mailTransport } from "services/email/mail.transport";
import tokenModel from "models/tokens";

const userCache = new UserCache();

/**
 * @class SignUp
 * @summary Resolver that handles the sign up process for users.
 * @description
 * - Checks if user already exists and throws an error.
 * - Uploads user's avatar image to the cloudinary server.
 * - Saves user's data to redis cache and mongodb.
 */
class SignUpClass {
  /**
   * Validate input parameters.
   * @throws BadRequestError if validation fails.
   */
  @ValidationDecorator(SignUpValidators)
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  private async validateParams(input: ISignUpInput) {
    return true;
  }

  /**
   * checks if the user exists in the database
   * @throws BadRequestError if user exists
   */

  private async checkIfUserExists(email: string) {
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      logger.error("User already exists");
      throw new BadRequestError("User already exists");
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
  private async saveToCacheAndDb(userDataForCache: IUser) {
    const { password, ...properties } = userDataForCache;
    // save user to cache
    await userCache.saveUserToCache(`${userDataForCache._id}`, properties);

    // create new user in db
    const user: HydratedDocument<IUserDocument> = await userModel.create({
      ...userDataForCache,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password: userPassword, ...userDetails } = user;
    return userDetails;
  }

  private async sendConfirmationEmail(email: string, userId: string) {
    let verificationToken = "";
    const tokenExists = await tokenModel.findOne({ userId });
    if (!tokenExists) {
      verificationToken = crypto.randomBytes(64).toString("hex");
      await tokenModel.create({
        token: verificationToken,
        userId,
        createdAt: new Date(),
      });
    } else {
      verificationToken = tokenExists.token;
    }
    const emailBody = await verifyEmailTemplate(
      `http://localhost:5174/email-verify?email=${email}&tk=${verificationToken}`,
    );
    try {
      const emailResult = await mailTransport.sendEmail(
        email,
        "verify your email",
        emailBody,
      );
      logger.info(JSON.stringify(emailResult));
    } catch (err) {
      logger.error(err);
      throw new InternalServerError(err);
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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
    const userDataForCache: IUser = {
      _id: userId,
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
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
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

export const SignUpResolver = new SignUpClass().signUpResolver;
export const ResendVerificationMail = new SignUpClass().resendVerificationMail;
