import {useState} from 'react'
import {getMealPlans as getMealPlansApiCall} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useGetMealPlans = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [mealPlans, setMealPlans] = useState([])

	const getMealPlans = async () => {
		setHasError(false)
		setIsLoading(true)
		const response = await getMealPlansApiCall(user.user_id, token)

		if (response.status === 200) {
			setMealPlans(response.data)
			setHasError(false)
			return response.data
		} else {
			setMealPlans([])
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, mealPlans, getMealPlans}
}

export default useGetMealPlans
