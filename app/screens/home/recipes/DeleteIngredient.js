import {useEffect, useState} from 'react'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import useDeleteMiscItems from '../../../hooks/useDeleteMiscItem'
import PageLoading from '../../../components/PageLoading'
import DeleteMiscItemModal from '../../../Models/DeleteMiscItemModal'
import ApiFallback from '../../../Models/ApiFallback'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import useGetIngredients from '../../../hooks/useGetIngredients'

const DeleteIngredient = () => {
	const [ingredientToBeDeleted, setIngredientToBeDeleted] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {hasError, isLoading, ingredients, getIngredients} = useGetIngredients()
	const ingredientNames = ingredients? ingredients.map(ingredient => ingredient.name) : []
		// useDeleteIngredient

		useEffect(() => {
			//getIngredients()
		}, [])

	const handleDeleteIngredient = () => {}

	const onDropDwonSelect = ingredientName => {
    const selectedIngredient = ingredients.filter(ingredient => ingredient.name === ingredientName)
    setIngredientToBeDeleted(selectedIngredient[0])
  }

	//apiFallback
	//isLoading
	//Modal

	return (
		<ScreenBase>
			<Spacer spaceRequired={40} />
			<Text>Pick an ingredient to delete</Text>
      <DropDownList listData={ingredientNames} onSelect={onDropDwonSelect} />
      <Spacer spaceRequired={18} />
      <Button onPress={handleDeleteIngredient} buttonText='Delete ingredient' disabled={!ingredientToBeDeleted} />
		</ScreenBase>
	)
}

export default DeleteIngredient
