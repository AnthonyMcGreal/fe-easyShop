import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import Home from '../app/screens/home/Home'

const navigate = jest.fn()

test('renders the home page title and nav buttons', () => {

	const {getByText} = render(<Home />)

	const title = getByText('EasyShop')
	const mealPlanButton = getByText('Meal plans')
	const recipesButton = getByText('Recipes')
	const miscItemsButton = getByText('Misc. items')

	expect(title).toBeVisible()
	expect(mealPlanButton).toBeVisible()
	expect(recipesButton).toBeVisible()
	expect(miscItemsButton).toBeVisible()
})

test('meal plan button navigates to the MealPlanHome screen', () => {

	const {getByText, debug} = render(<Home navigation={{navigate}}/>)
	
	const mealPlanButton = getByText('Meal plans')

	fireEvent.press(mealPlanButton)

	expect(navigate).toHaveBeenCalledWith("MealPlansHome")
})

test('recipes button navigates to the Recipes screen', () => {

	const {getByText, debug} = render(<Home navigation={{navigate}}/>)

	const recipeButton = getByText('Recipes')

	fireEvent.press(recipeButton)

	expect(navigate).toHaveBeenCalledWith("RecipesHome")
})

test('Misc. items button navigates to the MiscItems screen', () => {

	const {getByText, debug} = render(<Home navigation={{navigate}}/>)

	const MiscItemButton = getByText('Misc. items')

	fireEvent.press(MiscItemButton)

	expect(navigate).toHaveBeenCalledWith("MiscItems")
})
