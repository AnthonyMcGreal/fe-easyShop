import react from 'react'
import {Field, Formik, useFormik} from 'formik'
import {Text, View, StyleSheet, Pressable, TextInput} from 'react-native'

const LoginForm = ({onSubmit}) => (
	<Formik
		initialValues={{emailAddress: '', password: ''}}
		onSubmit={values => console.log(values)}
	>
		{({handleChange, handleBlur, handleSubmit, values}) => (
			<>
				<View>
					<Text style={styles.text}> Email Address </Text>
					<TextInput
						onChangeText={handleChange('email')}
						value={values.email}
						style={styles.input}
					/>
					<Text style={styles.text}> Password </Text>
					<TextInput
						onChangeText={handleChange('password')}
						value={values.password}
						style={styles.input}
						secureTextEntry={true}
					/>
					<Pressable
						// disabled={disableLogIn}
						style={
							styles.loginButton
							// 	disableLogIn ? styles.disableLoginButton : styles.loginButton
						}
						onPress={
							handleSubmit
						}
					>
						<Text style={{color: 'white', fontSize: 24}}>Log in</Text>
					</Pressable>
				</View>
			</>
		)}
	</Formik>
)

export default LoginForm

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: 250,
		marginTop: 12,
    marginBottom: 12,
		borderWidth: 3,
		padding: 10,
		paddingLeft: 25,
		borderColor: '#642CA9',
		borderRadius: 50,
		backgroundColor: '#F1F2F6',
		fontFamily: 'Nunito',
		color: 'black'
	},
	text: {
		fontSize: 24
	},

	loginButton: {
		backgroundColor: '#642CA9',
		marginTop: 60,
		height: 50,
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		color: 'white'
	}
})
