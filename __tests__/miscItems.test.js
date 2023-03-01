import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import MiscItems from '../app/screens/home/miscItems/MiscItems'

const renderMiscItems = () => {
	const navigate = jest.fn()

	render(
		<AuthProvider>
			<UserProvider>
				<MiscItems navigation={{navigate}} />
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
		navigate,
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
	const {navigate, addMiscItemButton} = renderMiscItems()

	fireEvent.press(addMiscItemButton)

	expect(navigate).toHaveBeenCalledWith('AddMiscItems')
})

test('Delete a misc item button navigates to the DeleteMiscItems screen', () => {
	const {navigate, deleteMiscItemButton} = renderMiscItems()

	fireEvent.press(deleteMiscItemButton)

	expect(navigate).toHaveBeenCalledWith('DeleteMiscItems')
})
