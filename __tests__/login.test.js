import {
	act,
	fireEvent,
	render,
	screen,
	waitFor
} from '@testing-library/react-native'
import React from 'react'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import LogIn from '../app/screens/LogIn'

const renderLogin = () => {
	const navigate = jest.fn()

	render(
		<AuthProvider>
			<UserProvider>
				<LogIn navigation={{navigate}} />
			</UserProvider>
		</AuthProvider>
	)

	const easyShopLogo = screen.getByLabelText(/Easy shop logo/)
	const emailAddress = screen.getByText(/Email Address/)
	const emailAddressInput = screen.getByLabelText(/email address input/)
	const passwordLabel = screen.getByText(/Password/)
	const passwordInput = screen.getByLabelText(/password input/)
	const loginButton = screen.getByRole('button', {name: /log in/})

	return {
		easyShopLogo,
		emailAddress,
		emailAddressInput,
		passwordLabel,
		passwordInput,
		loginButton,
		navigate
	}
}

test('Renders the login page', () => {
	const {
		easyShopLogo,
		emailAddress,
		emailAddressInput,
		passwordLabel,
		passwordInput,
		loginButton
	} = renderLogin()

	expect(easyShopLogo).toBeVisible()
	expect(emailAddress).toBeVisible()
	expect(emailAddressInput).toBeVisible()
	expect(passwordLabel).toBeVisible()
	expect(passwordInput).toBeVisible()
	expect(loginButton).toBeVisible()
})

test('allows a user to login', async () => {
	const {emailAddressInput, passwordInput, loginButton, navigate} =
		renderLogin()

	const testEmail = 'test@test.com'
	const password = 'test'

	expect(loginButton).toBeDisabled()

	await waitFor(() => fireEvent.changeText(emailAddressInput, testEmail))
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))

	expect(emailAddressInput.props.value).toEqual(testEmail)
	expect(passwordInput.props.value).toEqual(password)

	expect(loginButton).not.toBeDisabled()

	await waitFor(() => fireEvent.press(loginButton))

	await waitFor(() => expect(navigate).toHaveBeenCalledWith('Home'))
})

test('login button is disabled until a valid email address and password is entered', async () => {
	const {emailAddressInput, passwordInput, loginButton, navigate} =
		renderLogin()

	const invalidEmail = 'test'
	const validEmail = 'test@test.com'

	expect(loginButton).toBeDisabled()
	expect(emailAddressInput.props.value).toEqual('')

	await waitFor(() => fireEvent.changeText(emailAddressInput, invalidEmail))
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))

	expect(loginButton).toBeDisabled()

	await waitFor(() => fireEvent.changeText(emailAddressInput, validEmail))
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))

	expect(loginButton).not.toBeDisabled()

	await fireEvent.press(loginButton)

	await waitFor(() => expect(navigate).toHaveBeenCalledWith('Home'))
})

test.only('dispays error messages when invalid email addresses is entered or a password isnt entered', async () => {
	const {emailAddressInput, passwordInput, loginButton} = renderLogin()

	const invalidEmail = 'test'
	const validEmail = 'test@test.com'
	const password = 'test'

	const emailError = screen.queryByText('*Email address is required')
	let passwordError = screen.queryByText('*Password is required')

	expect(emailError).toBe(null)
	expect(passwordError).toBe(null)

	await fireEvent.changeText(emailAddressInput, '')
	await fireEvent.changeText(passwordInput, '')

	// await waitFor(() => fireEvent.press(loginButton))

	// const emailError1 = screen.findByText('*Not a valid email address')
	console.log('before expect')
	await screen.findByText('*Not a valid email address')
	// expect(a).toBeVisible()
})
