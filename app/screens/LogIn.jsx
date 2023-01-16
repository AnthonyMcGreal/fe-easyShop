import { useEffect, useState } from 'react'
import {
	Text,
	View,
	StyleSheet,
	Pressable,
	ActivityIndicator,
	Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { logIn } from '../api'
import { updateUser } from '../components/UserContext'
import { updateAuthContext } from '../components/AuthContext'

function LogIn({ navigation }) {
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
			<View>
				<Image style={styles.logo} source={require('../assets/easyShopLogo.png')} />
			</View>
			<View style={styles.inputView}>
				<Text style={styles.text}> Email Address </Text>
				<TextInput
					style={styles.input}
					onChangeText={setEmailAddress}
					value={emailAddress}
				/>
				<Text style={styles.text}> Password </Text>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					secureTextEntry={true}
				/>
				<View>
					<Text style={loginFailed ? styles.text : styles.hiddenText}>
						log in attempt failed :(
					</Text>
				</View>
				{loggingIn ? (
					<ActivityIndicator size="large" color="#6D2D55" animating={true} />
				) : (
					<Pressable
						disabled={disableLogIn}
						style={
							disableLogIn ? styles.disableLoginButton : styles.loginButton
						}
						onPress={() => {
							login()
						}}
					>
						<Text style={styles.text}>Log in</Text>
					</Pressable>
				)}
				{/* <Pressable style={styles.registerButton} onPress={navigateToRegister}>
						<Text style={styles.registerText}>Not registered? Register</Text>
						<Text style={styles.registerTextUnderline}>here</Text>
					</Pressable> */}
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
		width: 200
	},
	inputView: {
		top: 100,
		width: '100%',
		alignItems: 'center'
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		width: '70%',
		backgroundColor: 'white',
		fontFamily: 'Nunito'
	},
	text: {
		color: 'white',
		fontSize: 18
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
	loginButton: {
		backgroundColor: '#6D2D55',
		marginTop: 20,
		height: 40,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
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
