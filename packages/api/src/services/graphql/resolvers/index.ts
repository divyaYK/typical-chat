import { IResolvers } from "@graphql-tools/utils";
import { GraphQLDateTime } from "graphql-iso-date";
import { user } from "./user";
import { logout } from "./auth/logout";
import { refreshAccessToken } from "./auth/refreshAccessToken";
import { loginResolver } from "./auth/login";
import { verifyEmailResolver } from "./auth/verifyEmail";
import { signUpClass } from "./auth/signup";

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
    signup: signUpClass.signUpResolver,
    resendVerificationMail: signUpClass.resendVerificationMail,
  },
};

export default resolvers;
