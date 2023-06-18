import {Modal, View, StyleSheet, FlatList, Alert} from 'react-native'
import Button from '../components/Button'
import Spacer from '../components/Spacer'
import ScreenBase from '../components/ScreenBase'
import Text from '../components/Text'

const ConfrimIngredientsInRecipeModal = ({
	isModalOpen,
	confirmRecipe,
	ingredientsInRecipe,
	setIsModalOpen,
	recipeName
}) => {
	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				setIsModalOpen(false)
			}}
		>
			<ScreenBase>
				<View style={styles.flatListContainer}>
					<Text style={styles.title}>{recipeName}</Text>
					<Spacer spaceRequired={6} />
					<FlatList
						style={styles.flatList}
						data={ingredientsInRecipe}
						renderItem={({item}) => (
							<Text size={20} key={item.id}>
								- {item.name} ({item.ingredient_quantity}{' '}
								{item.unit_of_measurement})
							</Text>
						)}
						keyExtractor={(item, index) => index.toString()}
					></FlatList>
				</View>
				<Spacer spaceRequired={5} />

				<Button onPress={confirmRecipe} buttonText={'Confirm recipe?'} />
				<Spacer spaceRequired={5} />

				<Button onPress={setIsModalOpen} buttonText={'Edit recipe'} />
				<Spacer spaceRequired={5} />
			</ScreenBase>
		</Modal>
	)
}

const styles = StyleSheet.create({
	flatListContainer: {
		width: '85%',
		height: 400,
		flex: 1
	},
	title: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 10
	},
	flatList: {
		overflow: 'scroll'
	}
})

export default ConfrimIngredientsInRecipeModal
