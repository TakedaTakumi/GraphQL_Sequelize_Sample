const bcrypt = require('bcryptjs')

class UserModule {
	get apiType() {
		const result = [];

		result.push(`
			type User {
				id: Int!
				name: String!
				email: String!
				recipes: [Recipe!]!
			}
		`);

		return result.join('\n');
	}
	get queryType() {
		const result = [];

		result.push(`user(id: Int!): User`);

		return result.join('\n');
	}
	get queryList() {
		const result = [];

		result.push(this.user);

		return Object.fromEntries(result.map((func) => [func.name, func]));
	}
	get mutationType() {
		const result = [];

		result.push(`createUser(name: String!, email: String!, password: String!): User!`);

		return result.join('\n');
	}
	get mutationList() {
		const result = [];

		result.push(this.createUser);

		return Object.fromEntries(result.map((func) => [func.name, func]));
	}

	get otherResolver() {
		return {
			User: {
				async recipes(user) {
					return user.getRecipes()
				},
			},
		};
	}

	async user(root, { id }, { models }) {
		return models.User.findByPk(id);
	}

	async createUser(root, { name, email, password }, { models }) {
		return models.User.create({
			name,
			email,
			password: await bcrypt.hash(password, 10),
		});
	}
}

module.exports = UserModule;
