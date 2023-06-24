import {useEffect, useState} from 'react'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import DropDownList from '../../../components/DropDownList'
import PageLoading from '../../../components/PageLoading'
import ApiFallback from '../../../Models/ApiFallback'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import useGetMealPlans from '../../../hooks/useGetMealPlans'
import useDeleteMealPlan from '../../../hooks/useDeleteMealPlan'
import DeleteMealPlanModal from '../../../Models/DeleteMealPlanModal'

const DeleteMealPlan = () => {
	const [mealPlanToBeDeleted, setMealPlanToBeDeleted] = useState('')
	const [isModalOpen, setIsModalOpen] = useState(false)
	const {hasError, isLoading, mealPlans, getMealPlans} = useGetMealPlans()
	console.log(mealPlans)
	const mealPlanNames = mealPlans
		? mealPlans.map(mealPlan => mealPlan.name)
		: []
	const {
		hasError: hasDeleteError,
		isLoading: isDeleteLoading,
		isSuccess,
		deleteMealPlan
	} = useDeleteMealPlan()

	useEffect(() => {
		getMealPlans()
	}, [])

	const handleDeleteMealPlan = () => {
		setIsModalOpen(true)
		deleteMealPlan(mealPlanToBeDeleted)
	}

	const onDropDwonSelect = mealPlanName => {
		setMealPlanToBeDeleted(mealPlanName)
	}

	if (hasError || hasDeleteError)
		return (
			<ApiFallback goBackScreen={'MealPlansHome'} buttonText={'Meal plans'} />
		)

	if (isLoading) return <PageLoading />

	if (isModalOpen)
		return (
			<DeleteMealPlanModal
				isDeleteLoading={isDeleteLoading}
				isSuccess={isSuccess}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		)

	return (
		<ScreenBase>
			<Spacer spaceRequired={40} />
			<Text>Pick a meal plan to delete</Text>
			<DropDownList listData={mealPlanNames} onSelect={onDropDwonSelect} />
			<Spacer spaceRequired={18} />
			<Button
				onPress={handleDeleteMealPlan}
				buttonText="Delete meal plan"
				disabled={!mealPlanNames}
			/>
		</ScreenBase>
	)
}

export default DeleteMealPlan
