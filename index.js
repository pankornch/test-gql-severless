const { ApolloServer } = require('apollo-server-lambda');
const resolvers = require("./src/resolvers")
const typeDefs = require("./src/typedefs")

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphqlHandler = server.createHandler();