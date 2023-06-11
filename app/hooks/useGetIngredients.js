import {useState} from 'react'
import {getIngredients as getIngredientsApiCall} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useGetIngredients = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [ingredients, setIngredients] = useState([])

	const getIngredients = async () => {
		setHasError(false)
		setIsLoading(true)
		const ingredients = await getIngredientsApiCall(user.user_id, token)
		if (ingredients.status === 200) {
			setIngredients(ingredients.data.ingredients)
			setHasError(false)
		} else {
			setIngredients([])
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, ingredients, getIngredients}
}

export default useGetIngredients
