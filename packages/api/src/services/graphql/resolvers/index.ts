import { IResolvers } from "@graphql-tools/utils";
import { GraphQLDateTime } from "graphql-iso-date";
import { user } from "./user";
import { logout } from "./auth/logout";
import { refreshAccessToken } from "./auth/refreshAccessToken";
import { loginResolver } from "./auth/login";
import { ResendVerificationMail, SignUpResolver } from "./auth/signup";
import { verifyEmailResolver } from "./auth/verifyEmail";

const resolvers: IResolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    getUser: user,
    refreshAccessToken,
    logout,
    verifyEmail: verifyEmailResolver,
  },
  Mutation: {
    login: loginResolver,
    signup: SignUpResolver,
    resendVerificationMail: ResendVerificationMail,
  },
};

export default resolvers;
