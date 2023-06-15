import {useState} from 'react'
import {Pressable} from 'react-native'
import ScreenBase from '../../../components/ScreenBase'
import AddNewRecipeForm from '../../../forms/addNewRecipeForm'

const AddNewRecipe = ({navigation}) => {
	const handleCreateNewRecipe = (recipeName, recipeLink, portions) => {
		navigation.navigate('AddIngredientToRecipe', {
			recipeName,
			recipeLink,
			portions
		})
	}

	return (
		<ScreenBase>
			<AddNewRecipeForm onSubmit={handleCreateNewRecipe} />
		</ScreenBase>
	)
}

export default AddNewRecipe
