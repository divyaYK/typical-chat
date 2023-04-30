import gql from "graphql-tag";

const typeDef = gql`
  enum LoginMessage {
    SUCCESS
    NOT_FOUND
    SERVER_ERROR
    NOT_VERIFIED
  }

  type TokenResponse {
    status: String!
    access_token: String
    message: LoginMessage!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
    passwordConfirm: String!
  }

  input VerifyEmailInput {
    email: String!
    tk: String!
  }

  input ResendConfirmationInput {
    email: String!
  }

  enum VerificationStatus {
    SUCCESS
    NOT_FOUND
    LINK_EXPIRED
    SERVER_ERROR
    ALREADY_VERIFIED
  }

  type VerifyEmailResponse {
    status: VerificationStatus!
  }

  type Query {
    refreshAccessToken: TokenResponse!
    logout: Boolean!
    verifyEmail(input: VerifyEmailInput): VerifyEmailResponse!
  }

  type Mutation {
    login(input: LoginInput): TokenResponse!
    signup(input: SignUpInput): User
    resendVerificationMail(input: ResendConfirmationInput): VerifyEmailResponse!
  }
`;

export default typeDef;
