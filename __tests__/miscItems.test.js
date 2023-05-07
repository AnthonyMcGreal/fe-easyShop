import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import {useNavigation} from '@react-navigation/native'
import MiscItems from '../app/screens/home/miscItems/MiscItems'

jest.mock('@react-navigation/native')

let navigateMock

beforeEach(() => {
	navigateMock = jest.fn()
	useNavigation.mockReturnValue({navigate: navigateMock})
})

const renderMiscItems = () => {
	render(
		<AuthProvider>
			<UserProvider>
				<MiscItems />
			</UserProvider>
		</AuthProvider>
	)

	const easyShopLogo = screen.getByLabelText(/Easy shop logo/)
	const addMiscItemButton = screen.getByRole('button', {
		name: /Add a misc. Item/
	})
	const deleteMiscItemButton = screen.getByRole('button', {
		name: /Delete a misc. Item/
	})

	return {
		easyShopLogo,
		addMiscItemButton,
		deleteMiscItemButton
	}
}

test('renders the miscItems screen with logo and links', () => {
	const {easyShopLogo, addMiscItemButton, deleteMiscItemButton} =
		renderMiscItems()

	expect(easyShopLogo).toBeVisible()
	expect(addMiscItemButton).toBeVisible()
	expect(deleteMiscItemButton).toBeVisible()
})

test('Add a misc item button navigates to the AddMiscItems screen', () => {
	const {addMiscItemButton} = renderMiscItems()

	fireEvent.press(addMiscItemButton)

	expect(navigateMock).toHaveBeenCalledWith('AddMiscItems')
})

test('Delete a misc item button navigates to the DeleteMiscItems screen', () => {
	const {deleteMiscItemButton} = renderMiscItems()

	fireEvent.press(deleteMiscItemButton)

	expect(navigateMock).toHaveBeenCalledWith('DeleteMiscItems')
})
