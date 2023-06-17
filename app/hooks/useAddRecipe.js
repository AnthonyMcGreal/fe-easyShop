import {useState} from 'react'
import {addRecipe as addRecipeAPICall} from '../api'
import {useAuthContext} from '../components/AuthContext'
import {useUserContext} from '../components/UserContext'

const useAddRecipe = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const addRecipe = async recipe => {
		setIsLoading(true)
		const apiResponse = await addRecipeAPICall(recipe, user.user_id, token)
		if (apiResponse === 201) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, isSuccess, addRecipe}
}

export default useAddRecipe
