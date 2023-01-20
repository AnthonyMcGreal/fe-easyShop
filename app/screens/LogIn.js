import {useEffect, useState} from 'react'
import {
	Text,
	View,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	Image
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TextInput} from 'react-native-gesture-handler'
import {logIn} from '../api'
import {updateUser} from '../components/UserContext'
import {updateAuthContext} from '../components/AuthContext'
import {Field, Formik} from 'formik'
import LoginForm from '../forms/loginForm'

function LogIn({navigation}) {
	const setUser = updateUser()
	const setAuth = updateAuthContext()

	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const [loginFailed, setLoginFailed] = useState(false)
	const [loggingIn, setLoggingIn] = useState(false)

	useEffect(() => {
		navigation.addListener('beforeRemove', e => {
			e.preventDefault()
		})
	}, [navigation])

	let disableLogIn = true

	if (emailAddress && password) {
		disableLogIn = false
	}

	const login = async () => {
		// setLoggingIn(true)
		// setLoginFailed(false)
		// const userDetails = await logIn(emailAddress, password)
		// const fakeTimer = new Promise(resolve => {
		// 	setTimeout(resolve, 1000)
		// })
		// Promise.all([userDetails, fakeTimer]).then(() => {
		// 	if (userDetails) {
		// 		setUser(userDetails.user)
		// 		setAuth(userDetails.jwt)
		// 		setPassword('')
		// 		navigation.navigate('Home')
		// 	} else {
		// 		setLoginFailed(true)
		// 	}
		// 	setLoggingIn(false)
		// })
		navigation.navigate('Home')
	}

	const navigateToRegister = () => {
		navigation.navigate('Register')
	}

	return (
		<SafeAreaView style={styles.background}>
			<View style={{alignItems: 'center'}}>
					<Image
						style={styles.logo}
						source={require('../assets/easyShopLogo.png')}
					/>
					<LoginForm />
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'white',
		width: '100%',
		alignItems: 'center'
	},
	logo: {
		height: 200,
		width: 200,
	},
	registerText: {
		color: 'white',
		fontSize: 14
	},
	registerTextUnderline: {
		color: 'white',
		fontSize: 14,
		paddingLeft: 3,
		textDecorationLine: 'underline'
	},
	registerButton: {
		marginTop: 20,
		flexDirection: 'row'
	},
	hiddenText: {
		color: '#2d556d',
		fontSize: 18
	},
	disableLoginButton: {
		backgroundColor: '#B5B5B5',
		marginTop: 20,
		height: 40,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}
})

export default LogIn
