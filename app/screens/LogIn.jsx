import {useState, useContext} from 'react'
import {Text, View, StyleSheet, Button, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useFonts} from 'expo-font'
import AppLoading from 'expo-app-loading'
import {TextInput} from 'react-native-gesture-handler'
import {logIn} from '../api'
import {updateUser} from '../components/UserContext'
import {updateAuthContext} from '../components/AuthContext'

function LogIn({navigation}) {
	const setUser = updateUser()
	const setAuth = updateAuthContext()

	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const [loginFailed, setLoginFailed] = useState(false)

	let disableLogIn = true

	if (emailAddress && password) {
		disableLogIn = false
	}

	let [fontsLoaded] = useFonts({
		Nunito: require('../assets/fonts/Nunito-Bold.ttf')
	})

	const login = async () => {
		setLoginFailed(false)
		const userDetails = await logIn(emailAddress, password)
		if (userDetails) {
			setUser(userDetails.user)
			setAuth(userDetails.jwt)
			setPassword('')
			navigation.navigate('Home')
		} else {
			setLoginFailed(true)
		}
	}

	if (!fontsLoaded) {
		return <AppLoading />
	} else {
		return (
			<SafeAreaView style={styles.background}>
				<View>
					<Text style={styles.name}>EasyShop</Text>
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
				</View>
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#2d556d',
		width: '100%',
		alignItems: 'center'
	},
	name: {
		top: '50%',
		color: '#6D2D55',
		fontSize: 50,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 20,
		width: '100%'
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
	hiddenText: {
		color: '#2d556d',
		fontSize: 18
	},
	loginButton: {
		backgroundColor: '#6D2D55',
		marginTop: 20,
		height: 40,
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	disableLoginButton: {
		backgroundColor: '#B5B5B5',
		marginTop: 20,
		height: 40,
		width: 120,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}
})

export default LogIn
