import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import {useNavigation} from '@react-navigation/native'
import MealPlansHome from '../app/screens/home/mealPlans/MealPlansHome'

jest.mock('@react-navigation/native')

let navigateMock

beforeEach(() => {
	navigateMock = jest.fn()
	useNavigation.mockReturnValue({navigate: navigateMock})
})

const renderMealPlansHome = () => {
	render(
		<AuthProvider>
			<UserProvider>
				<MealPlansHome />
			</UserProvider>
		</AuthProvider>
	)

	const easyShopLogo = screen.getByLabelText(/Easy shop logo/)
	const createMealPlanButton = screen.getByRole('button', {
		name: /Create a meal plan/
	})
	const updateMealPlanButton = screen.getByRole('button', {
		name: /View\/Update a meal plan/
	})
	const deleteMealPlanButton = screen.getByRole('button', {
		name: /Delete a meal plan/
	})

	return {
		easyShopLogo,
		createMealPlanButton,
		updateMealPlanButton,
		deleteMealPlanButton
	}
}

test('Renders the meal plans homepage with logo and links', () => {
	const {
		easyShopLogo,
		createMealPlanButton,
		updateMealPlanButton,
		deleteMealPlanButton
	} = renderMealPlansHome()

	expect(easyShopLogo).toBeVisible()
	expect(createMealPlanButton).toBeVisible()
	expect(updateMealPlanButton).toBeVisible()
	expect(deleteMealPlanButton).toBeVisible()
})

test('Create a meal plan button navigates to the CreateMealPlan screen', () => {
	const {createMealPlanButton} = renderMealPlansHome()

	fireEvent.press(createMealPlanButton)

	expect(navigateMock).toHaveBeenCalledWith('CreateMealPlan')
})

test('View/Update a meal plan button navigates to the ViewMealPlans screen', () => {
	const {updateMealPlanButton} = renderMealPlansHome()

	fireEvent.press(updateMealPlanButton)

	expect(navigateMock).toHaveBeenCalledWith('ViewMealPlans')
})

test('Delete a meal plan button navigates to the DeleteMealPlans screen', () => {
	const {deleteMealPlanButton} = renderMealPlansHome()

	fireEvent.press(deleteMealPlanButton)

	expect(navigateMock).toHaveBeenCalledWith('DeleteMealPlans')
})
