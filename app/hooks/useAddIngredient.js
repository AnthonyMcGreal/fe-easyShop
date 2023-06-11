import {useState} from 'react'
import {addIngredient as addIngredientAPICall} from '../api'
import {useAuthContext} from '../components/AuthContext'
import {useUserContext} from '../components/UserContext'

const useAddIngredient = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const addIngredient = async (
		ingredientName,
		ingredientUOM,
		ingredientStorageType
	) => {
		setIsLoading(true)
		const apiResponse = await addIngredientAPICall(
			ingredientName,
			ingredientUOM,
			ingredientStorageType,
			user.user_id,
			token
		)
		if (apiResponse === 201) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, isSuccess, addIngredient}
}

export default useAddIngredient
