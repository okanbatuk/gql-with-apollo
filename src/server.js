import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// types and resolvers
import { typeDefs, resolvers } from "./schema.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

try {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
} catch (err) {
  console.error(err);
}
