import {useEffect, useState} from 'react'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import PageLoading from '../../../components/PageLoading'
import DeleteIngredientModal from '../../../Models/DeleteIngredientModal'
import ApiFallback from '../../../Models/ApiFallback'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import useGetIngredients from '../../../hooks/useGetIngredients'
import useDeleteIngredient from '../../../hooks/useDeleteIngredient'

const DeleteIngredient = () => {
	const [ingredientToBeDeleted, setIngredientToBeDeleted] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {hasError, isLoading, ingredients, getIngredients} = useGetIngredients()
	const ingredientNames = ingredients
		? ingredients.map(ingredient => ingredient.name)
		: []
	const {
		hasError: hasDeleteError,
		isLoading: isDeleteLoading,
		isSuccess,
		deleteIngredient
	} = useDeleteIngredient()

	useEffect(() => {
		getIngredients()
	}, [])

	const handleDeleteIngredient = () => {
		setIsModalOpen(true)
		deleteIngredient(ingredientToBeDeleted.ingredient_id)
	}

	const onDropDwonSelect = ingredientName => {
		const selectedIngredient = ingredients.filter(
			ingredient => ingredient.name === ingredientName
		)
		setIngredientToBeDeleted(selectedIngredient[0])
	}

	if (hasError || hasDeleteError)
		return <ApiFallback goBackScreen={'RecipesHome'} buttonText={'Recipes'} />

	if (isLoading) return <PageLoading />

	if (isModalOpen)
		return (
			<DeleteIngredientModal
				isDeleteLoading={isDeleteLoading}
				isSuccess={isSuccess}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		)

	return (
		<ScreenBase>
			<Spacer spaceRequired={40} />
			<Text>Pick an ingredient to delete</Text>
			<DropDownList listData={ingredientNames} onSelect={onDropDwonSelect} />
			<Spacer spaceRequired={18} />
			<Button
				onPress={handleDeleteIngredient}
				buttonText="Delete ingredient"
				disabled={!ingredientToBeDeleted}
			/>
		</ScreenBase>
	)
}

export default DeleteIngredient
