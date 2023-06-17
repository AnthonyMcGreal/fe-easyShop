import {useState} from 'react'
import {getRecipeByName as getRecipeApiCall} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useGetRecipe = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [recipe, setRecipe] = useState([])

	const getRecipe = async recipeName => {
		setHasError(false)
		setIsLoading(true)
		const response = await getRecipeApiCall(recipeName, user.user_id, token)

		if (response.status === 200) {
			setRecipe(response.data)
			setHasError(false)
			return response.data
		} else {
			setRecipe([])
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, recipe, getRecipe}
}

export default useGetRecipe
