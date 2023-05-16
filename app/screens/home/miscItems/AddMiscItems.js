import {useState} from 'react'
import {Pressable} from 'react-native'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import AddMiscItemForm from '../../../forms/addMiscItemForm'
import useAddMiscItems from '../../../hooks/useAddMiscItem'
import ApiFallback from '../../../Models/ApiFallback'
import PageLoading from '../../../components/PageLoading'
import AddMiscItemModal from '../../../Models/AddMiscItemModal'

const AddMiscItems = ({navigation}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {hasError, isLoading, isSuccess, addMiscItem} = useAddMiscItems()

	const backButton = () => {
		return (
			<Pressable
				style={styles.button}
				onPress={() => {
					navigation.navigate('MiscItems')
				}}
			>
				<Text style={styles.text}>Back to Misc Items</Text>
			</Pressable>
		)
	}

	const handleDeleteMiscItem = (miscItemName, itemCategory) => {
		setIsModalOpen(true)
		addMiscItem(miscItemName, itemCategory)
	}

	if (hasError)
		return <ApiFallback goBackScreen={'MiscItems'} buttonText={'Misc items'} />
	if (isLoading) return <PageLoading />

	if (isModalOpen)
		return (
			<AddMiscItemModal
				isLoading={isLoading}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		)

	return (
		<ScreenBase>
			<AddMiscItemForm onSubmit={handleDeleteMiscItem} />
		</ScreenBase>
	)
}

export default AddMiscItems
