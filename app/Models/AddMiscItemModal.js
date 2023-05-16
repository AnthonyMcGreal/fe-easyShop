import {Modal, View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'
import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'
import PageLoading from '../components/PageLoading'

const AddMiscItemModal = ({isLoading, isModalOpen, setIsModalOpen}) => {
	const navigation = useNavigation()

	if (isLoading) return <PageLoading />

	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				setIsModalOpen(false)
			}}
		>
			<View style={styles.background}>
				<Text style={styles.text}>Item Added</Text>
				<Spacer spaceRequired={5} />
				<Button
					onPress={() => navigation.navigate('MiscItems')}
					buttonText={'Back to Misc Items'}
				/>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: '100%'
	},
	text: {
		fontSize: 24,
		fontFamily: 'Nunito'
	}
})

export default AddMiscItemModal
