import { logger } from "shared/helpers/logger";
import { IGraphqlContext } from "interfaces/context.interface";

export const user = async (
  _: unknown,
  __: unknown,
  { req, CheckUser }: IGraphqlContext,
) => {
  try {
    const userObj: any = await CheckUser(req);

    if (!userObj) {
      return {
        message: "user not logged in",
      };
    }
    return {
      _id: userObj._id,
      avatar: userObj.avatar,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      createdAt: userObj.createdAt,
      updatedAt: userObj.updatedAt,
      verified: userObj.verified,
      uId: userObj.uId,
      password: "",
    };
  } catch (err) {
    logger.error(err);
  }
};
