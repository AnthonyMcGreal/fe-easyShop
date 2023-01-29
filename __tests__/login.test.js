import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react-native'
import LogIn from '../app/screens/LogIn'

const navigate = jest.fn()
const navigation = jest.fn()

const renderLogin = () => {
  const utils = render(<LogIn navigation={{navigate}}/>)
  const easyShopLogo = utils.getByLabelText('Easy shop logo')
  const emailAddress = utils.getByText('Email Address')
  const emailAddressInput = utils.getByLabelText('email address input')
  const passwordTitle = utils.getByText('Password')
  const passwordInput = utils.getByLabelText('password input')
  const loginButton = utils.getByText('Log in')

  return {
    ...utils, easyShopLogo, emailAddress, emailAddressInput,passwordTitle, passwordInput, loginButton
  }
}

test('Renders the login page', () => {
  const {easyShopLogo, emailAddress, emailAddressInput,passwordTitle, passwordInput, loginButton} = renderLogin()

  expect(easyShopLogo).toBeVisible()
  expect(emailAddress).toBeVisible()
  expect(emailAddressInput).toBeVisible()
  expect(passwordTitle).toBeVisible()
  expect(passwordInput).toBeVisible()
  expect(loginButton).toBeVisible()
})

test('allows a user to login', async() => {

  const {emailAddressInput, passwordInput, loginButton} = renderLogin()
  const testEmail = 'test@test.com'
  const password = 'test'

  expect(loginButton).toBeDisabled()

  fireEvent.changeText(emailAddressInput, testEmail)
  fireEvent.changeText(passwordInput, password)

  expect(emailAddressInput._fiber.memoizedProps.value).toEqual(testEmail)
  expect(passwordInput._fiber.memoizedProps.value).toEqual(password)
  expect(loginButton).not.toBeDisabled()

  fireEvent.press(loginButton)

  expect(navigate).toHaveBeenCalledWith('Home')
})