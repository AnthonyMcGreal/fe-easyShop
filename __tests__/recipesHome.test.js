import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import RecipesHome from '../app/screens/home/recipes/RecipesHome'

const renderRecipesHome = () => {
	const navigate = jest.fn()

	render(
		<AuthProvider>
			<UserProvider>
				<RecipesHome navigation={{navigate}} />
			</UserProvider>
		</AuthProvider>
	)

	const easyShopLogo = screen.getByLabelText(/Easy shop logo/)
	const addRecipeButton = screen.getByRole('button', {name: /Add a new recipe/})
	const updateRecipeButton = screen.getByRole('button', {
		name: /Update a recipe/
	})
	const deleteRecipeButton = screen.getByRole('button', {
		name: /Delete a recipe/
	})
	const addIngredientButton = screen.getByRole('button', {
		name: /Add an ingredient/
	})
	const deleteIngredientButton = screen.getByRole('button', {
		name: /Delete an ingredient/
	})

	return {
		navigate,
		easyShopLogo,
		addRecipeButton,
		updateRecipeButton,
		deleteRecipeButton,
		addIngredientButton,
		deleteIngredientButton
	}
}

test('renders the RecipesHome screen with logo and buttons', () => {
	const {
		navigate,
		easyShopLogo,
		addRecipeButton,
		updateRecipeButton,
		deleteRecipeButton,
		addIngredientButton,
		deleteIngredientButton
	} = renderRecipesHome()

	expect(easyShopLogo).toBeVisible()
	expect(addRecipeButton).toBeVisible()
	expect(updateRecipeButton).toBeVisible()
	expect(deleteRecipeButton).toBeVisible()
	expect(addIngredientButton).toBeVisible()
	expect(deleteIngredientButton).toBeVisible()
})

test('add recipe button navigates to AddNewRecipe', () => {
	const {navigate, addRecipeButton} = renderRecipesHome()

	fireEvent.press(addRecipeButton)

	expect(navigate).toHaveBeenCalledWith('AddNewRecipe')
})

test('update recipe button navigates to UpdateRecipe', () => {
	const {navigate, updateRecipeButton} = renderRecipesHome()

	fireEvent.press(updateRecipeButton)

	expect(navigate).toHaveBeenCalledWith('UpdateRecipe')
})

test('delete recipe button navigates to DeleteRecipe', () => {
	const {navigate, deleteRecipeButton} = renderRecipesHome()

	fireEvent.press(deleteRecipeButton)

	expect(navigate).toHaveBeenCalledWith('DeleteRecipe')
})

test('add an ingredient button navigates to AddIngredient', () => {
	const {navigate, addIngredientButton} = renderRecipesHome()

	fireEvent.press(addIngredientButton)

	expect(navigate).toHaveBeenCalledWith('AddIngredient')
})

test('delete an ingredient button navigates to DeleteIngredient', () => {
	const {navigate, deleteIngredientButton} = renderRecipesHome()

	fireEvent.press(deleteIngredientButton)

	expect(navigate).toHaveBeenCalledWith('DeleteIngredient')
})
