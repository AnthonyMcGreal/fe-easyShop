import {useState} from 'react'
import {addMiscItem as addMiscItemAPICall} from '../api'
import {useAuthContext} from '../components/AuthContext'
import { useUserContext } from '../components/UserContext'

const useAddMiscItems = () => {
  const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const addMiscItem = async (itemName, itemCategory) => {
		setIsLoading(true)
		const apiResponse = await addMiscItemAPICall(itemName,itemCategory,user.user_id, token)
		if (apiResponse === 201) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, isSuccess, addMiscItem}
}

export default useAddMiscItems