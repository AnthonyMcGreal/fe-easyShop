import {useState} from 'react'
import {deleteMiscItemById} from '../api'
import {useAuthContext} from '../components/AuthContext'

const useDeleteMiscItems = () => {
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const deleteMiscItem = item => {
		setIsLoading(true)
		const apiResponse = deleteMiscItemById(item.item_id, token)

		if (apiResponse === 204) {
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
