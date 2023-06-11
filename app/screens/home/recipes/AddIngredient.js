import {useState} from 'react'
import ScreenBase from '../../../components/ScreenBase'
import AddIngredientForm from '../../../forms/addIngredientForm'
import AddIngredientModal from '../../../Models/AddIngredientModal'
import useAddIngredient from '../../../hooks/useAddIngredient'
import PageLoading from '../../../components/PageLoading'

const AddIngredient = ({navigation}) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {hasError, isLoading, isSuccess, addIngredient} = useAddIngredient()

	const handleAddIngredient = (
		ingredientName,
		ingredientUOM,
		ingredientStorageType
	) => {
		setIsModalOpen(true)
		addIngredient(ingredientName, ingredientUOM, ingredientStorageType)
	}

	if (hasError)
		return (
			<ApiFallback goBackScreen={'RecipesHome'} buttonText={'Misc items'} />
		)
	if (isLoading) return <PageLoading />

	if (isModalOpen)
		return (
			<AddIngredientModal
				isLoading={isLoading}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		)

	return (
		<ScreenBase>
			<AddIngredientForm onSubmit={handleAddIngredient} />
		</ScreenBase>
	)
}

export default AddIngredient
