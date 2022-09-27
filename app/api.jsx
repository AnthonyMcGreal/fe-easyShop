import axios from 'axios'

const baseURL = 'https://easy-shop-be.herokuapp.com/api'

exports.logIn = async (email, password) => {
	return axios.post(`${baseURL}/login`,{
		email:email,
		password:password
	}).then ((result) => {
		return {user:result.data, jwt:result.headers["set-cookie"][0].slice(4,-8)}
	}).catch((err) => {
		return false
	})
}

exports.addMiscItem = async (itemName, itemCategory) => {
	const promise = axios.post(`${baseURL}/miscItem`, {
		name: itemName,
		username: 'Anthony',
		category: itemCategory
	})
	const result = await promise
	return result.status
}

exports.getMiscItems = async () => {
	return axios.get(`${baseURL}/miscItem`)
}

exports.deleteMiscItemById = async itemId => {
	return axios.delete(`${baseURL}/miscItem/${itemId}`)
}

exports.addIngredient = async (
	ingredientName,
	ingredientUOM,
	ingredientStorageType
) => {
	return axios
		.post(`${baseURL}/ingredients`, {
			name: ingredientName,
			unit_of_measurement: ingredientUOM,
			storage_type: ingredientStorageType,
			username: 'Anthony'
		})
		.then(result => {
			return result.status
		})
}

exports.getIngredients = async () => {
	return axios.get(`${baseURL}/ingredients`)
}

exports.deleteIngredientById = async ingredientId => {
	return axios.delete(`${baseURL}/ingredients/${ingredientId}`)
}

exports.addRecipe = async recipe => {
	const recipeWithUser = recipe.map(ingredient => {
		return {...ingredient, username: 'Anthony'}
	})
	return axios
		.post(`${baseURL}/recipe`, recipeWithUser)
		.then(result => {
			return result.status
		})
		.catch(err => console.log(err))
}

exports.getRecipes = async () => {
	return axios.get(`${baseURL}/recipe`)
}

exports.deleteRecipeByName = async name => {
	return axios.delete(`${baseURL}/recipe/${name}`)
}

exports.getRecipeByName = async name => {
	return axios.get(`${baseURL}/recipe/${name}`)
}

exports.addMealPlan = async mealPlan => {
	const mealPlanWithUser = [
		{
			name: mealPlan.mealPlanName,
			username: 'Anthony',
			recipes: mealPlan.recipes
		}
	]
	return axios
		.post(`${baseURL}/mealPlans`, mealPlanWithUser)
		.then(result => {
			return result.status
		})
		.catch(err => console.log(err))
}

exports.getMealPlans = async () => {
	return axios.get(`${baseURL}/mealPlans`)
}

exports.deleteMealPlanByName = async mealPlanName => {
	return axios.delete(`${baseURL}/mealPlans/${mealPlanName}`)
}

exports.getMealPlanByName = async mealPlanName => {
	return axios.get(`${baseURL}/mealPlans/${mealPlanName}`)
}

exports.updateMealPlan = async mealPlan => {
	const mealPlanName = mealPlan.name
	const mealPlanWithUser = {...mealPlan, username: 'Anthony'}
	return axios
		.patch(`${baseURL}/mealPlans/${mealPlanName}`, mealPlanWithUser)
		.then(result => {
			return result.status
		})
		.catch(err => console.log(err))
}

exports.getShoppingList = async recipes => {
	return axios
		.post(`${baseURL}/shoppingList`, recipes)
		.then(result => {
			return result.data.shoppingList
		})
		.catch(err => console.log(err))
}
