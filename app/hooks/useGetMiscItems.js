import {useState} from 'react'
import {getMiscItems as getMiscItemsApiCall} from '../api'
import {useUserContext} from '../components/UserContext'
import {useAuthContext} from '../components/AuthContext'

const useGetMiscItems = () => {
	const user = useUserContext()
	const token = useAuthContext()

	const [hasError, setHasError] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [miscItems, setMiscItems] = useState(false)

	const getMiscItems = async () => {
		setHasError(false)
		setIsLoading(true)
		const items = await getMiscItemsApiCall(user.user_id, token)
		if (items.status === 200) {
			setMiscItems(items.data.miscItems)
			setHasError(false)
		} else {
			setMiscItems([])
			setHasError(true)
		}
		setIsLoading(false)
	}

	return {hasError, isLoading, miscItems, getMiscItems}
}

export default useGetMiscItems
