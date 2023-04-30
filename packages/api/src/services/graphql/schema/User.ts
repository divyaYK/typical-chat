import gql from "graphql-tag";

const typeDef = gql`
  type User {
    _id: String!
    avatar: String
    firstName: String!
    lastName: String
    email: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    verified: Boolean!
    uId: String!
  }

  type Query {
    getUser: User
  }
`;

export default typeDef;
