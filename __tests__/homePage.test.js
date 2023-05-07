import * as React from 'react'
import {render, fireEvent} from '@testing-library/react-native'

import {useNavigation} from '@react-navigation/native'
import Home from '../app/screens/home/Home'

jest.mock('@react-navigation/native')

let navigateMock

beforeEach(() => {
	navigateMock = jest.fn()
	useNavigation.mockReturnValue({navigate: navigateMock})
})

test('Renders the home page logo and nav buttons', () => {
	const {getByText, getByLabelText} = render(<Home />)

	const easyShopLogo = getByLabelText('Easy shop logo')
	const mealPlanButton = getByText('Meal plans')
	const recipesButton = getByText('Recipes')
	const miscItemsButton = getByText('Misc. items')

	expect(easyShopLogo).toBeVisible()
	expect(mealPlanButton).toBeVisible()
	expect(recipesButton).toBeVisible()
	expect(miscItemsButton).toBeVisible()
})

test('Meal plan button navigates to the MealPlanHome screen', () => {
	const {getByText} = render(<Home />)

	const mealPlanButton = getByText('Meal plans')

	fireEvent.press(mealPlanButton)

	expect(navigateMock).toHaveBeenCalledWith('MealPlansHome')
})

test('Recipes button navigates to the Recipes screen', () => {
	const {getByText} = render(<Home />)

	const recipeButton = getByText('Recipes')

	fireEvent.press(recipeButton)

	expect(navigateMock).toHaveBeenCalledWith('RecipesHome')
})

test('Misc. items button navigates to the MiscItems screen', () => {
	const {getByText} = render(<Home />)

	const MiscItemButton = getByText('Misc. items')

	fireEvent.press(MiscItemButton)

	expect(navigateMock).toHaveBeenCalledWith('MiscItems')
})
