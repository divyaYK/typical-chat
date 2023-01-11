import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import { readFileSync } from "fs";
import path from "path";

const server = new ApolloServer({
  typeDefs: readFileSync(path.join(__dirname + "/schema/schema.graphql"), {
    encoding: "utf-8",
  }),
  resolvers: resolvers,
  context: ({ req, res }) => ({ req, res }),
});

export default server;
