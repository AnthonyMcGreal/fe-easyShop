import {useState} from 'react'
import {logIn} from '../api'
import {updateUser} from '../components/UserContext'
import {updateAuthContext} from '../components/AuthContext'

const useLogin = () => {
	const setUser = updateUser()
	const setAuth = updateAuthContext()

	const [hasloginFailed, setHasLoginFailed] = useState(false)
	const [isloggingIn, setIsLoggingIn] = useState(false)
	const [isLoginSuccessful, setIsLoginSuccessful] = useState(false)

	const login = async (emailAddress, password) => {
		setIsLoggingIn(true)
		setHasLoginFailed(false)
		const userDetails = await logIn(emailAddress, password)
		if (userDetails) {
			setUser(userDetails.user)
			setAuth(userDetails.jwt)
			setIsLoginSuccessful(true)
		} else {
			setHasLoginFailed(true)
		}
		setIsLoggingIn(false)
	}

	return {hasloginFailed, isloggingIn, isLoginSuccessful, login}
}

export default useLogin
