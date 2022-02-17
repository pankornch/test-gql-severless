import { ApolloServer } from 'apollo-server-lambda'
import resolvers from "./src/resolvers"
import typeDefs from "./src/typedefs"

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();