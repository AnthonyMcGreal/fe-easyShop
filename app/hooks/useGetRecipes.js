import {useState} from 'react'
import {getRecipes as getRecipesApiCall} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useGetRecipes = () => {
  const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [recipes, setRecipes] = useState([])

  const getRecipes = async () => {
    setHasError(false)
		setIsLoading(true)
    const response = await getRecipesApiCall(user.user_id, token)
    if(response.status === 200){
      setRecipes(response.data.recipes)
      setHasError(false)
    } else {
      setRecipes([])
      setHasError(true)
    }
    setIsLoading(false)
  }

  return {hasError, isLoading, recipes, getRecipes}
}

export default useGetRecipes