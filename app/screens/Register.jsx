import {useState, useContext} from 'react'
import {Text, View, StyleSheet, Button, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TextInput} from 'react-native-gesture-handler'
import {register} from '../api'

function Register({navigation}) {
	const [emailAddress, setEmailAddress] = useState('')
	const [password, setPassword] = useState('')
	const [registerFailed, setRegisterFailed] = useState(false)

	let disableRegister = true

	if (emailAddress && password) {
		disableRegister = false
	}

	const handleRegister = async () => {
		setRegisterFailed(false)
		const response = await register(emailAddress, password)
		if (response === 201) {
			navigation.navigate('LogIn')
		} else {
			setRegisterFailed(true)
		}
	}

	const navigateToLogin = () => {
		navigation.navigate('LogIn')
	}
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
					<Text style={registerFailed ? styles.text : styles.hiddenText}>
						Registration failed :(
					</Text>
				</View>
				<Pressable
					disabled={disableRegister}
					style={
						disableRegister ? styles.disableRegisterButton : styles.loginButton
					}
					onPress={handleRegister}
				>
					<Text style={styles.text}>Register</Text>
				</Pressable>
				<Pressable style={styles.registerButton} onPress={navigateToLogin}>
					<Text style={styles.registerText}> Back to login</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
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
	registerText: {
		color: 'white',
		fontSize: 14
	},
	registerButton: {
		marginTop: 20
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
	disableRegisterButton: {
		backgroundColor: '#B5B5B5',
		marginTop: 20,
		height: 40,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	}
})

export default Register
