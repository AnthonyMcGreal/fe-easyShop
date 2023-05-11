import {useState} from 'react'
import {deleteMiscItemById} from '../api'
import {useAuthContext} from '../components/AuthContext'

const useDeleteMiscItems = () => {
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const deleteMiscItem = async item => {
		setIsLoading(true)
		const apiResponse = await deleteMiscItemById(item.item_id, token)
		if (apiResponse.status === 204) {
			setIsSuccess(true)
			setHasError(false)
		} else {
			setIsSuccess(false)
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, isSuccess, deleteMiscItem}
}

export default useDeleteMiscItems
