import React from 'react'
import {
	render,
	screen,
	fireEvent,
	act,
	waitFor
} from '@testing-library/react-native'
import LogIn from '../app/screens/LogIn'
import {UserProvider} from '../app/components/UserContext'
import {AuthProvider} from '../app/components/AuthContext'

const navigate = jest.fn()

const renderLogin = () => {
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
	const loginButton = screen.getByRole('button',{ name: /log in/})

	return {easyShopLogo,emailAddress,emailAddressInput,passwordLabel,passwordInput,loginButton}
}

test('Renders the login page', () => {

	const{easyShopLogo,emailAddress,emailAddressInput,passwordLabel,passwordInput,loginButton} = renderLogin()

	expect(easyShopLogo).toBeVisible()
	expect(emailAddress).toBeVisible()
	expect(emailAddressInput).toBeVisible()
	expect(passwordLabel).toBeVisible()
	expect(passwordInput).toBeVisible()
	expect(loginButton).toBeVisible()
})

test('allows a user to login', async () => {

	const {emailAddressInput,passwordInput,loginButton} = renderLogin()

	const testEmail = 'test@test.com'
	const password = 'test'

	expect(loginButton).toBeDisabled()

	await waitFor(() => fireEvent.changeText(emailAddressInput, testEmail))
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))

	expect(emailAddressInput.props.value).toEqual(testEmail)
	expect(passwordInput.props.value).toEqual(password)

	expect(loginButton).not.toBeDisabled()

	await waitFor(() => fireEvent.press(loginButton))

	waitFor(() => expect(navigate).toHaveBeenCalledWith('Home'))
})

test('login button is disabled until a valid email address and password is entered', async () => {
	
	const {emailAddressInput,passwordInput,loginButton} = renderLogin()

	const invalidEmail = 'test'
	const validEmail = 'test@test.com'
	
	expect(loginButton).toBeDisabled()
	expect(emailAddressInput.props.value).toEqual('')
	
	await waitFor(() => fireEvent.changeText(emailAddressInput, invalidEmail))
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))
	
	expect(loginButton).toBeDisabled()
	
	await waitFor(() => fireEvent.changeText(emailAddressInput, validEmail))
	
	expect(loginButton).not.toBeDisabled()
	
	fireEvent.press(loginButton)

	expect(await navigate).toHaveBeenCalled()
	expect(await navigate).toHaveBeenCalledWith('Home')
})

test('dispays error messages when invalid email addresses is entered or a password isnt entered', async () => {

	const {emailAddressInput,passwordInput} = renderLogin()

	const invalidEmail = 'test'
	const validEmail = 'test@test.com'
	const password = 'test'

	const emailError = screen.queryByText('*Email address is required')
	let passwordError = screen.queryByText('*Password is required')

	expect(emailError).toBe(null)
	expect(passwordError).toBe(null)

	await fireEvent.changeText(emailAddressInput, '')
	await fireEvent.changeText(passwordInput, '')

	// const emailError1 = screen.findByText('*Not a valid email address')
	console.log('before expect')
	expect(await screen.findByText('*Not a valid email address')).toBeVisible()

})
