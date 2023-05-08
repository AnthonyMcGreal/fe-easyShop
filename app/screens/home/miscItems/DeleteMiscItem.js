import {useEffect, useState} from 'react'
import {Text, StyleSheet} from 'react-native'
import Button from '../../../components/Button'
import {SafeAreaView} from 'react-native-safe-area-context'
import useGetMiscItems from '../../../hooks/useGetMiscItems'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import useDeleteMiscItems from '../../../hooks/useDeleteMiscItem'
import PageLoading from '../../../components/PageLoading'
import DeleteMiscItemModal from '../../../Models/DeleteMiscItemModal'
import ApiFallback from '../../../Models/ApiFallback'

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

	if(hasError || hasDeleteError) return <ApiFallback goBackScreen={'MiscItems'} buttonText={'Misc items'} />
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
		<SafeAreaView style={styles.background}>
			<Spacer spaceRequired={40} />
			<Text style={styles.text}>Pick a misc. item to delete</Text>
			<DropDownList listData={miscItems} onSelect={setItemToBeDeleted} />
			<Spacer spaceRequired={18} />
			<Button
				onPress={() => {
					handleDeleteMiscItem()
				}}
				buttonText="Delete item"
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		width: '100%'
	},
	text: {
		fontFamily: 'Nunito',
		fontSize: 20
	}
})

export default DeleteMiscItems
