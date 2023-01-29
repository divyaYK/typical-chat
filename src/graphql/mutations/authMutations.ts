import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation createUser($input: SignUpInput) {
    signup(input: $input) {
      _id
    }
  }
`;

export const LOGIN = gql`
  mutation loginUser($input: LoginInput) {
    login(input: $input) {
      status
      access_token
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation loginUser($input: LogoutInput) {
    logout(input: $input) {
      __typename
    }
  }
`;

export const RESEND_VERIFICATION_LINK = gql`
  mutation resendLink($input: ResendConfirmationInput) {
    resendVerificationMail(input: $input) {
      status
    }
  }
`;
