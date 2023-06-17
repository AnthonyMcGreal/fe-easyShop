import {useEffect, useState} from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import RoundButton from '../../../components/RoundButton'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import AddIngredientToRecipeModal from '../../../Models/AddIngredientToRecipeModal'
import RemoveIngredientFromRecipeModal from '../../../Models/RemoveIngredientFromRecipeModal'
import ConfrimIngredientsInRecipeModal from '../../../Models/ConfirmIngredientsInRecipeModal'
import useAddRecipe from '../../../hooks/useAddRecipe'
import SubmitRecipeModal from '../../../Models/SubmitRecipeModal'

const AddIngredientToRecipe = ({route}) => {
	const [ingredientsInRecipe, setIngredientsInRecipe] = useState([])
	const [addModalVisible, setAddModalVisible] = useState(false)
	const [removeModalVisible, setRemoveModalVisible] = useState(false)
	const [confirmModalVisible, setConfirmModalVisible] = useState(false)
	const [submitModalVisible, setSubmitModalVisible] = useState(false)
	const {hasError, isLoading, isSuccess, addRecipe} = useAddRecipe()

	//route.params.previousScreen

	console.log(route.params)

	const previousScreen = route.params.previousScreen
	const recipe_name = route.params.recipeName
	const link = route.params.link
	const portions = route.params.portions

	useEffect(() => {
		if (previousScreen === 'UpdateRecipe') {
			setIngredientsInRecipe([...route.params.recipe])
		}
	}, [])

	const displayAddIngredientModal = () => setAddModalVisible(true)
	const displayRemoveIngredientModal = () => setRemoveModalVisible(true)
	const onPressCompleteRecipe = () => setConfirmModalVisible(true)

	const addIngredientToRecipe = (ingredient, quantity) => {
		let newIngredient = {
			recipe_name: recipe_name,
			link: link || '',
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

	const removeIngredientFromRecipe = ingredientName => {
		const newIngredientList = ingredientsInRecipe.filter(
			ingredient => ingredient.name !== ingredientName
		)

		setIngredientsInRecipe(newIngredientList)
		setRemoveModalVisible(false)
	}

	const confirmRecipe = () => {
		setSubmitModalVisible(true)
		if (previousScreen === 'UpdateRecipe') {
			console.log('updateBlock')
		}
		const recipeToSubmit = ingredientsInRecipe.map(ingredient => {
			return {
				ingredients: ingredient.ingredients,
				recipe_name: ingredient.recipe_name,
				link: ingredient.link,
				ingredient_quantity: ingredient.ingredient_quantity,
				portions: ingredient.portions
			}
		})
		addRecipe(recipeToSubmit)
	}

	const editRecipe = () => {
		setConfirmModalVisible(false)
	}

	if (hasError)
		return (
			<ApiFallback goBackScreen={'RecipesHome'} buttonText={'Recipe home'} />
		)

	if (submitModalVisible)
		return (
			<SubmitRecipeModal
				isLoading={isLoading}
				isModalOpen={submitModalVisible}
				setIsModalOpen={setSubmitModalVisible}
			/>
		)

	if (addModalVisible)
		return (
			<AddIngredientToRecipeModal
				isModalOpen={addModalVisible}
				setIsModalOpen={setAddModalVisible}
				addIngredientToRecipe={addIngredientToRecipe}
			/>
		)

	if (removeModalVisible)
		return (
			<RemoveIngredientFromRecipeModal
				isModalOpen={removeModalVisible}
				setisModalOpen={setRemoveModalVisible}
				ingredientsInRecipe={ingredientsInRecipe}
				removeIngredientFromRecipe={removeIngredientFromRecipe}
			/>
		)

	if (confirmModalVisible)
		return (
			<ConfrimIngredientsInRecipeModal
				isModalOpen={confirmModalVisible}
				confirmRecipe={confirmRecipe}
				ingredientsInRecipe={ingredientsInRecipe}
				setIsModalOpen={editRecipe}
				recipeName={recipe_name}
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
				disabled={ingredientsInRecipe.length < 1}
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
