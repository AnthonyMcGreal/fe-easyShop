import {useState} from 'react'
import {deleteMealPlanByName} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useDeleteMealPlan = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const deleteMealPlan = async mealPlanName => {
		setIsLoading(true)
		const apiResponse = await deleteMealPlanByName(
			mealPlanName,
			user.user_id,
			token
		)
		if (apiResponse.status === 204) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, isSuccess, deleteMealPlan}
}

export default useDeleteMealPlan
