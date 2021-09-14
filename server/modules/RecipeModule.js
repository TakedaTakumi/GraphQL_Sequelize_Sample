class RecipeModule {
	get apiType() {
		const result = [];

		result.push(`
			type Recipe {
				id: Int!
				title: String!
				ingredients: String!
				direction: String!
				user: User!
			}
		`);

		return result.join('\n');
	}
	get queryType() {
		const result = [];

		result.push('allRecipes: [Recipe!]!');
		result.push('recipe(id: Int!): Recipe');

		return result.join('\n');
	}
	get queryList() {
		const result = [];

		result.push(this.allRecipes);
		result.push(this.recipe);

		return Object.fromEntries(result.map((func) => [func.name, func]));
	}
	get mutationType() {
		const result = [];

		result.push('createRecipe(userId: Int!, title: String!, ingredients: String!, direction: String!): Recipe!');

		return result.join('\n');
	}
	get mutationList() {
		const result = [];

		result.push(this.createRecipe);

		return Object.fromEntries(result.map((func) => [func.name, func]));
	}

	get otherResolver() {
		return {
			Recipe: {
				async user(recipe) {
					return recipe.getUser()
				},
			},
		};
	}

	async allRecipes(root, args, { models }) {
		return models.Recipe.findAll()
	}
	async recipe(root, { id }, { models }) {
		return models.Recipe.findByPk(id)
	}

	async createRecipe(root, { userId, title, ingredients, direction }, { models }) {
		return models.Recipe.create({ userId, title, ingredients, direction })
	}

}

module.exports = RecipeModule;
