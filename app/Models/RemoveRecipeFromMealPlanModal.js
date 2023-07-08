import {Modal, View, StyleSheet, Text} from 'react-native'
import RemoveRecipeFromMealPlanForm from '../forms/removeRecipeFromMealPlanForm'

const RemoveRecipeFromMealPlan = ({
	isModalOpen,
	setIsModalOpen,
	removeRecipeFromMealPlan,
	mealPlan,
	daysAvailable
}) => {
	daysWithRecipes = daysAvailable.filter((day, index) => {
		return Object.keys(mealPlan.recipes[index][day]).length !== 0
	})
	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				setIsModalOpen(false)
			}}
		>
			<View style={styles.background}>
				<RemoveRecipeFromMealPlanForm
					daysWithRecipes={daysWithRecipes}
					recipes={mealPlan.recipes}
					onSubmit={removeRecipeFromMealPlan}
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

export default RemoveRecipeFromMealPlan
