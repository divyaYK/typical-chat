import { ApolloServer } from "apollo-server-express";
import CheckUser from "middleware/checkUser";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, CheckUser }),
});

export default server;
