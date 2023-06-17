import axios from 'axios'

const baseURL = process.env.API_URL ?? 'http://10.0.2.2:9090/api'

exports.logIn = async (email, password) => {
	return axios
		.post(`${baseURL}/login`, {
			email: email,
			password: password
		})
		.then(res => {
			return {
				user: res.data,
				jwt: res.headers['set-cookie'][0].slice(4, -8)
			}
		})
		.catch(err => {
			return false
		})
}

exports.register = async (email, password) => {
	const params = {
		email: email,
		password: password
	}

	return axios
		.post(`${baseURL}/user`, params)
		.then(res => {
			return res.status
		})
		.catch(err => {
			console.log(err)
			return err
		})
}

exports.addMiscItem = async (itemName, itemCategory, user_id, token) => {
	const params = {
		name: itemName,
		user_id: user_id,
		category: itemCategory
	}

	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	const promise = axios.post(`${baseURL}/miscItem`, params, config)
	const result = await promise
	return result.status
}

exports.getMiscItems = async (user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.get(`${baseURL}/miscItem/${user_id}`, config)
}

exports.deleteMiscItemById = async (itemId, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.delete(`${baseURL}/miscItem/${itemId}`, config)
}

exports.addIngredient = async (
	ingredientName,
	ingredientUOM,
	ingredientStorageType,
	user_id,
	token
) => {
	const params = {
		name: ingredientName,
		unit_of_measurement: ingredientUOM,
		storage_type: ingredientStorageType,
		user_id: user_id
	}

	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.post(`${baseURL}/ingredients`, params, config).then(result => {
		return result.status
	})
}

exports.getIngredients = async (user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.get(`${baseURL}/ingredients/${user_id}`, config)
}

exports.deleteIngredientById = async (ingredientId, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.delete(`${baseURL}/ingredients/${ingredientId}`, config)
}

exports.addRecipe = async (recipe, user_id, token) => {
	const recipeWithUser = recipe.map(ingredient => {
		return {...ingredient, user_id: user_id}
	})

	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios
		.post(`${baseURL}/recipe`, recipeWithUser, config)
		.then(result => {
			return result.status
		})
		.catch(err => {
			return 500
		})
}

exports.getRecipes = async (user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.get(`${baseURL}/recipe/${user_id}`, config)
}

exports.deleteRecipeByName = async (name, user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.delete(`${baseURL}/recipe/${user_id}/${name}`, config)
}

exports.getRecipeByName = async (name, user_id, token) => {
	console.log('inside api call', name, user_id, token)
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.get(`${baseURL}/recipe/${user_id}/${name}`, config)
}

exports.addMealPlan = async (mealPlan, user_id, token) => {
	const mealPlanWithUser = [
		{
			name: mealPlan.mealPlanName,
			user_id: user_id,
			recipes: mealPlan.recipes
		}
	]

	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios
		.post(`${baseURL}/mealPlans`, mealPlanWithUser, config)
		.then(result => {
			return result.status
		})
		.catch(err => console.log(err))
}

exports.getMealPlans = async (user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.get(`${baseURL}/mealPlans/${user_id}`, config)
}

exports.deleteMealPlanByName = async (mealPlanName, user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.delete(`${baseURL}/mealPlans/${user_id}/${mealPlanName}`, config)
}

exports.getMealPlanByName = async (mealPlanName, user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios.get(`${baseURL}/mealPlans/${user_id}/${mealPlanName}`, config)
}

exports.updateMealPlan = async (mealPlan, user_id, token) => {
	const mealPlanName = mealPlan.name
	const mealPlanWithUser = {...mealPlan, user_id: user_id}
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}
	return axios
		.patch(
			`${baseURL}/mealPlans/${user_id}/${mealPlanName}`,
			mealPlanWithUser,
			config
		)
		.then(result => {
			return result.status
		})
		.catch(err => console.log(err))
}

exports.getShoppingList = async (recipes, user_id, token) => {
	const config = {
		headers: {Authorization: `Bearer ${token}`}
	}

	return axios
		.post(`${baseURL}/shoppingList/${user_id}`, recipes, config)
		.then(result => {
			return result.data.shoppingList
		})
		.catch(err => console.log(err))
}

exports.wakeBackend = async () => {
	axios.get(`${baseURL}/wake`)
}
