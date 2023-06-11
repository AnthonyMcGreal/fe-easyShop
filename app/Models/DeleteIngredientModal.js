import {Modal, View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'

import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'
import PageLoading from '../components/PageLoading'

const DeleteIngredientModal = ({
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
				<Text style={styles.text}>Ingredient deleted</Text>
				<Spacer spaceRequired={5} />
				<Button
					onPress={() => navigation.navigate('RecipesHomes')}
					buttonText={'Back to Recipes'}
				/>
			</View>
		</Modal>
  )
}

export default DeleteIngredientModal
