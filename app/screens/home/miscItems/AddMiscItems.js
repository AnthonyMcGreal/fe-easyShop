import {useState} from 'react'
import {StyleSheet, Pressable} from 'react-native'
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

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: 250,
		margin: 12,
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Nunito'
	},
	button: {
		backgroundColor: '#6D2D55',
		width: 250,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	dropDownStyle: {
		width: 250,
		height: 50,
		margin: 12,
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		marginBottom: 60
	},
	dropDownText: {
		lineHeight: 20,
		fontSize: 16,
		paddingLeft: 10,
		fontFamily: 'Nunito'
	},
	rowStyle: {
		backgroundColor: 'lightgrey'
	},
	modelContainer: {
		backgroundColor: '#2d556d',
		width: '80%',
		height: '80%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	afterActionText: {
		color: '#6D2D55',
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 70,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 12
	}
})

export default AddMiscItems
