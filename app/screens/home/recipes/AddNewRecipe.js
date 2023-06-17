import ScreenBase from '../../../components/ScreenBase'
import AddNewRecipeForm from '../../../forms/addNewRecipeForm'

const AddNewRecipe = ({navigation}) => {
	const handleCreateNewRecipe = (recipeName, recipeLink, portions) => {
		navigation.navigate('AddIngredientToRecipe', {
			recipeName,
			recipeLink,
			portions,
			previousScreen: 'AddNewRecipe'
		})
	}

	return (
		<ScreenBase>
			<AddNewRecipeForm onSubmit={handleCreateNewRecipe} />
		</ScreenBase>
	)
}

export default AddNewRecipe
