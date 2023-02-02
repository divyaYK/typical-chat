import { gql } from "@apollo/client";

export const VERIFY_EMAIL = gql`
  query checkToken($email: String!, $tk: String!) {
    verifyEmail(input: { email: $email, tk: $tk }) {
      status
    }
  }
`;
