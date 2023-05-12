import {useEffect, useState} from 'react'
import Button from '../../../components/Button'
import useGetMiscItems from '../../../hooks/useGetMiscItems'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import useDeleteMiscItems from '../../../hooks/useDeleteMiscItem'
import PageLoading from '../../../components/PageLoading'
import DeleteMiscItemModal from '../../../Models/DeleteMiscItemModal'
import ApiFallback from '../../../Models/ApiFallback'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'

const DeleteMiscItems = () => {
	const [itemToBeDeleted, setItemToBeDeleted] = useState()
	const [isModalOpen, setIsModalOpen] = useState(false)
	let {hasError, isLoading, miscItems, getMiscItems} = useGetMiscItems()
	const {
		hasError: hasDeleteError,
		isLoading: isDeleteLoading,
		isSuccess,
		deleteMiscItem
	} = useDeleteMiscItems()

	useEffect(() => {
		getMiscItems()
	}, [])

	const handleDeleteMiscItem = () => {
		setIsModalOpen(true)
		deleteMiscItem(itemToBeDeleted)
	}

	if (hasError || hasDeleteError)
		return <ApiFallback goBackScreen={'MiscItems'} buttonText={'Misc items'} />
	if (isLoading) return <PageLoading />
	if (isModalOpen)
		return (
			<DeleteMiscItemModal
				isDeleteLoading={isDeleteLoading}
				isSuccess={isSuccess}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		)

	return (
		<ScreenBase>
			<Spacer spaceRequired={40} />
			<Text>Pick an item to delete</Text>
			<DropDownList listData={miscItems} onSelect={setItemToBeDeleted} />
			<Spacer spaceRequired={18} />
			<Button
				onPress={() => {
					handleDeleteMiscItem()
				}}
				buttonText="Delete item"
			/>
		</ScreenBase>
	)
}

export default DeleteMiscItems
