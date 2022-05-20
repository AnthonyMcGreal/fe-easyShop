import axios from "axios";

const baseURL = "https://easy-shop-be.herokuapp.com/api"

exports.addMiscItem = async(itemName, itemCategory) => {
    const promise = axios.post(`${baseURL}/miscItem`,{
        name:itemName,
        username:"Anthony",
        category:itemCategory
    });
    const result = await promise
    return result.status;
};

exports.getMiscItems = async() => {
     return axios.get(`${baseURL}/miscItem`);
}

exports.deleteMiscItemById = async(itemId) => {
    return axios.delete(`${baseURL}/miscItem/${itemId}`)
}

exports.addIngredient = async(ingredientName, ingredientUOM, ingredientStorageType) => {
    return axios.post(`${baseURL}/ingredients`, {
            name: ingredientName,
            unit_of_measurement: ingredientUOM,
            storage_type: ingredientStorageType,
            username: "Anthony",
    }).then((result) => {
        return result.status
    })
}

exports.getIngredients = async() => {
    return axios.get(`${baseURL}/ingredients`)
}

exports.deleteIngredientById = async (ingredientId) => {
    return axios.delete(`${baseURL}/ingredients/${ingredientId}`)
}

exports.addRecipe = async (recipe) => {
    const recipeWithUser = recipe.map((ingredient) => {return {...ingredient, username:"Anthony" }})
    return axios.post(`${baseURL}/recipe`, recipeWithUser)
                .then((result)=>{return result.status})
                .catch((err) => console.log(err))
}

exports.getRecipes = async () => {
    return axios.get(`${baseURL}/recipe`)
}

exports.deleteRecipeByName = async (name) => {
    return axios.delete(`${baseURL}/recipe/${name}`)
}
