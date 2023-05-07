import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import {useNavigation} from '@react-navigation/native'
import RecipesHome from '../app/screens/home/recipes/RecipesHome'

jest.mock('@react-navigation/native')

let navigateMock

beforeEach(() => {
	navigateMock = jest.fn()
	useNavigation.mockReturnValue({navigate: navigateMock})
})

const renderRecipesHome = () => {
	render(
		<AuthProvider>
			<UserProvider>
				<RecipesHome />
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
	const {addRecipeButton} = renderRecipesHome()

	fireEvent.press(addRecipeButton)

	expect(navigateMock).toHaveBeenCalledWith('AddNewRecipe')
})

test('update recipe button navigates to UpdateRecipe', () => {
	const {updateRecipeButton} = renderRecipesHome()

	fireEvent.press(updateRecipeButton)

	expect(navigateMock).toHaveBeenCalledWith('UpdateRecipe')
})

test('delete recipe button navigates to DeleteRecipe', () => {
	const {deleteRecipeButton} = renderRecipesHome()

	fireEvent.press(deleteRecipeButton)

	expect(navigateMock).toHaveBeenCalledWith('DeleteRecipe')
})

test('add an ingredient button navigates to AddIngredient', () => {
	const {addIngredientButton} = renderRecipesHome()

	fireEvent.press(addIngredientButton)

	expect(navigateMock).toHaveBeenCalledWith('AddIngredient')
})

test('delete an ingredient button navigates to DeleteIngredient', () => {
	const {deleteIngredientButton} = renderRecipesHome()

	fireEvent.press(deleteIngredientButton)

	expect(navigateMock).toHaveBeenCalledWith('DeleteIngredient')
})
