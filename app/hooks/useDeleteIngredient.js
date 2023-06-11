import {useState} from 'react'
import {deleteIngredientById} from '../api'
import {useAuthContext} from '../components/AuthContext'

const useDeleteIngredient = () => {
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const deleteIngredient = async ingredientID => {
		setIsLoading(true)
		const apiResponse = await deleteIngredientById(ingredientID, token)
		if (apiResponse.status === 204) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
	}
	return {hasError, isLoading, isSuccess, deleteIngredient}
}

export default useDeleteIngredient
