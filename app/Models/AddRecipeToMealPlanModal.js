import {useEffect} from 'react'
import {Modal, View, StyleSheet, Text, Alert} from 'react-native'
import PageLoading from '../components/PageLoading'
import AddRecipeToMealPlanForm from '../forms/addRecipeToMealPlanForm'
import useGetIngredients from '../hooks/useGetIngredients'

const AddRecipeToMealPlanModal = ({
	isModalOpen,
	setIsModalOpen,
	addRecipeToMealPlan,
	recipes,
	days,
	portionSizes
}) => {
	// if (isLoading) return <PageLoading />
	// if (hasError)
	// 	return <ApiFallback goBackScreen={'RecipesHome'} buttonText={'Recipes'} />

	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				setIsModalOpen(false)
			}}
		>
			<View style={styles.background}>
				<AddRecipeToMealPlanForm
					recipes={recipes}
					days={days}
					portionSizes={portionSizes}
					onSubmit={addRecipeToMealPlan}
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

export default AddRecipeToMealPlanModal
