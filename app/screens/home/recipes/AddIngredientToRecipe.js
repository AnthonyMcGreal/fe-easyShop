import {useState, useEffect} from 'react'
import {
	StyleSheet,
	Pressable,
	Modal,
	View,
	FlatList,
	ActivityIndicator
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TextInput} from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {getIngredients, addRecipe} from '../../../api'
import {useUserContext} from '../../../components/UserContext'
import {useAuthContext} from '../../../components/AuthContext'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import RoundButton from '../../../components/RoundButton'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import AddIngredientToRecipeModal from '../../../Models/AddIngredientToRecipeModal'

const AddIngredientToRecipe = ({route}) => {
	const [ingredientsInRecipe, setIngredientsInRecipe] = useState([])
	const [addModalVisible, setAddModalVisible] = useState(false)
	const [removeModalVisible, setRemoveModalVisible] = useState(false)

	const recipe_name = route.params.recipeName
	const link = route.params.link
	const portions = route.params.portions

	const displayAddIngredientModal = () => setAddModalVisible(true)
	const displayRemoveIngredientModal = () => setRemoveModalVisible(true)
	const onPressCompleteRecipe = () => {}

	const addIngredientToRecipe = (ingredient, quantity) => {
		let newIngredient = {
			recipe_name: recipe_name,
			link: link,
			name: ingredient.name,
			ingredient_quantity: quantity,
			unit_of_measurement: ingredient.unit_of_measurement,
			portions: portions,
			storage_type: ingredient.storage_type,
			ingredients: ingredient.ingredient_id
		}

		setIngredientsInRecipe([...ingredientsInRecipe, newIngredient])
		setAddModalVisible(false)
	}

	if (addModalVisible)
		return (
			<AddIngredientToRecipeModal
				isModalOpen={addModalVisible}
				setIsModalOpen={setAddModalVisible}
				addIngredientToRecipe={addIngredientToRecipe}
			/>
		)
	return (
		<ScreenBase>
			<View style={styles.flatListContainer}>
				<Text style={styles.title}>{recipe_name}</Text>
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
			<Spacer spaceRequired={7} />
			<View style={styles.buttonContainer}>
				<RoundButton onPress={displayAddIngredientModal} buttonText={'+'} />
				<RoundButton onPress={displayRemoveIngredientModal} buttonText={'-'} />
			</View>
			<Spacer spaceRequired={7} />
			<Button
				onPress={onPressCompleteRecipe}
				buttonText={'Complete recipe'}
				disabled={true}
			/>
			<Spacer spaceRequired={7} />
		</ScreenBase>
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
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '70%'
	}
})

export default AddIngredientToRecipe
