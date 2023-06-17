import {useEffect} from 'react'
import {Modal, View, StyleSheet, Text} from 'react-native'
import PageLoading from '../components/PageLoading'
import useGetIngredients from '../hooks/useGetIngredients'
import AddIngredientsToRecipeForm from '../forms/addIngredientToRecipeForm'

const AddIngredientToRecipeModal = ({
	isModalOpen,
	setIsModalOpen,
	addIngredientToRecipe
}) => {
	const {hasError, isLoading, ingredients, getIngredients} = useGetIngredients()

	useEffect(() => {
		getIngredients()
	}, [])

	const ingredientNames = ingredients
		? ingredients.map(ingredient => ingredient.name)
		: []

	const getFullIngredientAndAddToRecipe = (
		ingredientName,
		ingredientQuantity
	) => {
		const fullIngredient = ingredients.find(
			ingredient => ingredient.name === ingredientName
		)

		addIngredientToRecipe(fullIngredient, ingredientQuantity)
	}

	if (isLoading) return <PageLoading />
	if (hasError)
		return <ApiFallback goBackScreen={'RecipesHome'} buttonText={'Recipes'} />

	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				setIsModalOpen(false)
			}}
		>
			<View style={styles.background}>
				<AddIngredientsToRecipeForm
					ingredients={ingredientNames}
					onSubmit={getFullIngredientAndAddToRecipe}
				/>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		width: '100%'
	}
})

export default AddIngredientToRecipeModal
