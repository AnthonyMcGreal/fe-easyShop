import {useEffect, useState} from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {logIn} from '../api'
import {updateUser} from '../components/UserContext'
import {updateAuthContext} from '../components/AuthContext'
import LoginForm from '../forms/loginForm'

function LogIn({navigation}) {
	const setUser = updateUser()
	const setAuth = updateAuthContext()

	const [loginFailed, setLoginFailed] = useState(false)
	const [loggingIn, setLoggingIn] = useState(false)

	useEffect(() => {
		navigation.addListener('beforeRemove', e => {
			e.preventDefault()
		})
	}, [navigation])

	const login = async (emailAddress, password) => {
		setLoggingIn(true)
		setLoginFailed(false)
		const userDetails = await logIn(emailAddress, password)
		const fakeTimer = new Promise(resolve => {
			setTimeout(resolve, 1000)
		})
		Promise.all([userDetails, fakeTimer]).then(() => {
			if (userDetails) {
				setUser(userDetails.user)
				setAuth(userDetails.jwt)
				navigation.navigate('Home')
			} else {
				setLoginFailed(true)
			}
			setLoggingIn(false)
		})
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
				<LoginForm onSubmit={login} />
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
		height: 170,
		width: 200
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
	}
})

export default LogIn
