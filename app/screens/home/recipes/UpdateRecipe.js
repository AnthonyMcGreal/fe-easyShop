import {useEffect, useState} from 'react'
import {View, StyleSheet, Pressable} from 'react-native'
import ScreenBase from '../../../components/ScreenBase'
import useGetRecipe from '../../../hooks/useGetRecipe'
import useGetRecipes from '../../../hooks/useGetRecipes'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import Text from '../../../components/Text'
import PageLoading from '../../../components/PageLoading'
import {useNavigation} from '@react-navigation/native'

const UpdateRecipe = () => {
	const [recipeToBeUpdated, setRecipeToBeUpdated] = useState('')
	const {hasError, isLoading, recipes, getRecipes} = useGetRecipes()
	const recipeNames = recipes ? recipes.map(recipe => recipe.recipe_name) : []
	const {
		hasError: hasRecipeError,
		isLoading: isRecipeLoading,
		recipe,
		getRecipe
	} = useGetRecipe()

	const navigation = useNavigation()

	useEffect(() => {
		getRecipes()
	}, [])

	const updateRecipe = async () => {
		const recipe = await getRecipe(recipeToBeUpdated)
		const recipeName = recipeToBeUpdated
		const recipeLink = recipe[0].link
		const portions = recipe[0].portions

		navigation.navigate('AddIngredientToRecipe', {
			recipeName,
			recipeLink,
			portions,
			previousScreen: 'UpdateRecipe',
			recipe
		})
	}

	const onRecipeSelect = recipeName => {
		setRecipeToBeUpdated(recipeName)
		getRecipe(recipeToBeUpdated)
	}

	return (
		<ScreenBase>
			<Spacer spaceRequired={40} />
			<Text>Pick a recipe to update</Text>
			<DropDownList listData={recipeNames} onSelect={onRecipeSelect} />
			<Spacer spaceRequired={18} />
			<Button
				onPress={() => {
					updateRecipe()
				}}
				buttonText="Update recipe"
				disabled={!recipeToBeUpdated}
			/>
		</ScreenBase>
	)
}

export default UpdateRecipe
