import gql from "graphql-tag";

const typeDef = gql`
  scalar DateTime
  directive @auth on QUERY | FIELD_DEFINITION | FIELD
`;

export default typeDef;
