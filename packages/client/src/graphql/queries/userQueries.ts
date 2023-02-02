import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser {
    getUser {
      _id
      email
      avatar
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
