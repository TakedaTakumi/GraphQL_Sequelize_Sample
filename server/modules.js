const { gql } = require('apollo-server')

const UserModule = require('./modules/UserModule')
const RecipeModule = require('./modules/RecipeModule')

const moduleList = [
	new UserModule(),
	new RecipeModule(),
]

const typeDefs = gql`
	${moduleList.map((m) => m.apiType).join('\n')}
	type Query {
		${moduleList.map((m) => m.queryType).join('\n')}
	}
	type Mutation {
		${moduleList.map((m) => m.mutationType).join('\n')}
	}
`

const resolvers = {
	Query: {
		...Object.fromEntries(
			moduleList.map((m) => Object.entries(m.queryList)).flat()
		),
	},
	Mutation: {
		...Object.fromEntries(
			moduleList.map((m) => Object.entries(m.mutationList)).flat()
		),
	},
	...Object.fromEntries(
		moduleList.map((m) => Object.entries(m.otherResolver)).flat()
	),
}

module.exports = { typeDefs, resolvers }
