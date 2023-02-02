import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const AuthMiddleware: ApolloLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // eslint-disable-next-line array-callback-return
        graphQLErrors.map(({
          message, locations, path, extensions,
        // eslint-disable-next-line array-callback-return
        }) => {
          console.log({ message, locations, path });
          if (extensions.code === "UNAUTHENTICATED") {
            localStorage.removeItem("jwt");
            client.clearStore();
          }
        });
        if (networkError) {
          console.log({ networkError });
        }
      }
    }),
    AuthMiddleware,
    new HttpLink({
      uri: "http://localhost:5684/graphql",
      credentials: "include",
    }),
  ]),
  cache: new InMemoryCache(),
});

export default client;
