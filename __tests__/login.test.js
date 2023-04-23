import {fireEvent, render, screen, waitFor} from '@testing-library/react-native'
import React from 'react'
import {AuthProvider} from '../app/components/AuthContext'
import {UserProvider} from '../app/components/UserContext'
import LogIn from '../app/screens/LogIn'
import {rest} from 'msw'
import {server} from '../app/mocks/server'

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
	fireEvent(emailAddressInput, 'blur')
	await waitFor(() => fireEvent.changeText(passwordInput, password))
	fireEvent(passwordInput, 'blur')

	expect(emailAddressInput.props.value).toEqual(testEmail)
	expect(passwordInput.props.value).toEqual(password)

	expect(loginButton).not.toBeDisabled()

	await waitFor(() => fireEvent.press(loginButton))

	await waitFor(() =>
		expect(screen.queryByLabelText(/logging in/)).toBeVisible()
	)
	await waitFor(() => expect(screen.queryByLabelText(/logging in/)).toBeNull())

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
	fireEvent(emailAddressInput, 'blur')
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))
	fireEvent(passwordInput, 'blur')

	expect(loginButton).toBeDisabled()

	await waitFor(() => fireEvent.changeText(emailAddressInput, validEmail))
	await waitFor(() => fireEvent.changeText(passwordInput, 'test'))

	expect(loginButton).not.toBeDisabled()

	await waitFor(() => fireEvent.press(loginButton))

	await waitFor(() =>
		expect(screen.queryByLabelText(/logging in/)).toBeVisible()
	)
	await waitFor(() => expect(screen.queryByLabelText(/logging in/)).toBeNull())

	await waitFor(() => expect(navigate).toHaveBeenCalledWith('Home'))
})

test('displays error messages when invalid email addresses is entered', async () => {
	// get the email input from our setup
	const {emailAddressInput} = renderLogin()

	// fire a change event on the email input
	fireEvent.changeText(emailAddressInput, 'test')

	// fire a blur event on the email input
	fireEvent(emailAddressInput, 'blur')

	// get the error message but wrap it in a waitFor as formik needs to run its validation and the element won't be immediately visible
	const errorMessage = await waitFor(() =>
		screen.getByText('*Not a valid email address')
	)

	// do our assertion
	expect(errorMessage).toBeVisible()
})

test('displays error messages when no email address is entered', async () => {
	const {emailAddressInput} = renderLogin()

	fireEvent.changeText(emailAddressInput, '')

	fireEvent(emailAddressInput, 'blur')

	const errorMessage = await waitFor(() =>
		screen.getByText('*Email address is required')
	)

	expect(errorMessage).toBeVisible()
})

test('displays error messages when no password is entered', async () => {
	const {passwordInput} = renderLogin()

	fireEvent.changeText(passwordInput, '')

	fireEvent(passwordInput, 'blur')

	const errorMessage = await waitFor(() =>
		screen.getByText('*Password is required')
	)

	expect(errorMessage).toBeVisible()
})

test('displays error message when login fails', async () => {
	server.use(
		rest.post(`http://10.0.2.2:9090/api/login`, (req, res, ctx) => {
			return res(ctx.delay(), ctx.status(401), ctx.json({msg: 'Login failed'}))
		})
	)

	const {emailAddressInput, passwordInput, loginButton, navigate} =
		renderLogin()

	const testEmail = 'test@test.com'
	const password = 'test'

	expect(loginButton).toBeDisabled()

	await waitFor(() => fireEvent.changeText(emailAddressInput, testEmail))
	fireEvent(emailAddressInput, 'blur')
	await waitFor(() => fireEvent.changeText(passwordInput, password))
	fireEvent(passwordInput, 'blur')

	expect(loginButton).not.toBeDisabled()

	await waitFor(() => fireEvent.press(loginButton))

	await waitFor(() =>
		expect(screen.queryByLabelText(/logging in/)).toBeVisible()
	)
	await waitFor(() => expect(screen.queryByLabelText(/logging in/)).toBeNull())

	const errorMessage = await waitFor(() =>
		screen.queryByText(/\*Log in failed :\(/)
	)

	expect(errorMessage).toBeVisible()
})
