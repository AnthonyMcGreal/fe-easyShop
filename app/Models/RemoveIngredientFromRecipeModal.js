import {useState, useEffect, Alert} from 'react'
import {Modal, View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'
import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'
import PageLoading from '../components/PageLoading'
import useGetIngredients from '../hooks/useGetIngredients'
import AddIngredientsToRecipeForm from '../forms/addIngredientToRecipeForm'
import RemoveIngredientsFromRecipeForm from '../forms/removeIngredientFromRecipeForm'

const RemoveIngredientFromRecipeModal = ({
	isModalOpen,
	setisModalOpen,
	ingredientsInRecipe,
	removeIngredientFromRecipe
}) => {
	const ingredientNames = ingredientsInRecipe.map(ingredient => ingredient.name)

	return (
		<Modal
			visible={isModalOpen}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				setIsModalOpen(false)
			}}
		>
			<View style={styles.background}>
				<RemoveIngredientsFromRecipeForm
					ingredients={ingredientNames}
					onSubmit={removeIngredientFromRecipe}
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

export default RemoveIngredientFromRecipeModal
