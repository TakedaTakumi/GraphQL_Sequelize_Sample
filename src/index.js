const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('../server/modules')
const models = require('../models')
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')

const server = new ApolloServer({
	typeDefs,
  resolvers,
  context: { models },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
})

server.listen({
        port: 3000,
      }).then(({ url }) => console.log('Server is running on localhost:3000'))

