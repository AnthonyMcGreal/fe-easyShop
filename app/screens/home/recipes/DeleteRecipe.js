import {useEffect, useState} from 'react'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import PageLoading from '../../../components/PageLoading'
import DeleteRecipeModal from '../../../Models/DeleteRecipeModal'
import ApiFallback from '../../../Models/ApiFallback'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import useDeleteRecipe from '../../../hooks/useDeleteRecipe'
import useGetRecipes from '../../../hooks/useGetRecipes'

const DeleteRecipe = () => {
  const [recipeToBeDeleted, setRecipeToBeDeleted] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {hasError, isLoading, recipes, getRecipes} = useGetRecipes()
  const recipeNames = recipes? recipes.map(recipe => recipe.recipe_name) : []
  const {hasError : hasDeleteError, isLoading: isDeleteLoading, isSuccess, deleteRecipe} = useDeleteRecipe()

  useEffect(() => {
    getRecipes()
  }, [])

  const handleDeleteRecipe = () => {
    setIsModalOpen(true)
    deleteRecipe(recipeToBeDeleted)
  }

  if (hasError || hasDeleteError)
		return <ApiFallback goBackScreen={'RecipeHome'} buttonText={'Back to Recipes'} />
    if (isLoading) return <PageLoading />
  if(isModalOpen)
    return (
      <DeleteRecipeModal 
      isDeleteLoading={isDeleteLoading}
      isSuccess={isSuccess}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      />
    )

  const onRecipeDropdownSelect = recipeName => {
    setRecipeToBeDeleted(recipeName)
  }

  return (
    <ScreenBase>
      <Spacer spaceRequired={40} />
      <Text>Pick a recipe to delete</Text>
      <DropDownList listData={recipeNames} onSelect={onRecipeDropdownSelect} />
      <Spacer spaceRequired={18} />
			<Button
				onPress={() => {
					handleDeleteRecipe()
				}}
				buttonText="Delete recipe"
				disabled={!recipeToBeDeleted}
			/>
    </ScreenBase>
  )
}

export default DeleteRecipe