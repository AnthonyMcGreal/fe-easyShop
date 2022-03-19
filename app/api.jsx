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