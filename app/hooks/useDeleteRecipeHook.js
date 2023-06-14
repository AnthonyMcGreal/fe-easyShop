import {useState} from 'react'
import {deleteRecipeByName} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useDeleteRecipe = () => {
	const user = useUserContext()
  const token = useAuthContext()

  const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

  const deleteRecipe = async recipeName => {
    setIsLoading(true)
    const apiResponse = await deleteRecipeByName(recipeName, user.user_id, token)
    if (apiResponse.status === 204) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
  }
  return {hasError, isLoading, isSuccess, deleteRecipe}
}

export default useDeleteRecipe