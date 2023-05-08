import {Modal, View, StyleSheet, Text, Pressable} from 'react-native'
import Button from '../components/Button'

import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'
import PageLoading from '../components/PageLoading'

const DeleteMiscItemModal = ({
	isDeleteLoading,
	isSuccess,
	isModalOpen,
	setIsModalOpen
}) => {
	const navigation = useNavigation()

	if (isDeleteLoading) return <PageLoading />

	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				setIsModalOpen(false)
			}}
		>
			<View style={styles.background}>
				<Text style={styles.text}>Item deleted</Text>
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

export default DeleteMiscItemModal
