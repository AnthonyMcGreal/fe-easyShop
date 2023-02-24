import {Formik} from 'formik'
import react from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import Spacer from '../components/Spacer'

const LoginForm = ({onSubmit}) => {
	const validateForm = values => {
		const errors = {}

		if (!values.emailAddress) {
			console.log('inside error if')
			errors.emailAddress = '*Email address is required'
		} else if (!/^\S+@\S+$/.test(values.emailAddress)) {
			errors.emailAddress = '*Not a valid email address'
		}

		if (!values.password) errors.password = '*Password is required'

		return errors
	}

	return (
		<Formik
			initialValues={{emailAddress: '', password: ''}}
			initialTouched={{emailAddress: false, password: false}}
			onSubmit={values => onSubmit(values.emailAddress, values.password)}
			validate={values => validateForm(values)}
		>
			{({handleChange, handleBlur, handleSubmit, values, errors, touched}) => {
				console.log('ccc', errors)
				console.log(touched)
				return (
					<>
						<View>
							<Text style={styles.text}>Email Address </Text>
							<Spacer />
							<TextInput
								accessibilityLabel="email address input"
								onChangeText={handleChange('emailAddress')}
								onBlur={handleBlur('emailAddress')}
								value={values.emailAddress}
								style={
									errors.emailAddress && touched.emailAddress
										? [styles.input, styles.inputError]
										: styles.input
								}
							/>
							{errors.emailAddress && touched.emailAddress ? (
								<Text style={styles.errorText}>{errors.emailAddress}</Text>
							) : (
								<Spacer size="xl" />
							)}
							<Text style={styles.text}>Password </Text>
							<Spacer />
							<TextInput
								accessibilityLabel="password input"
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
								value={values.password}
								style={
									(errors.password && touched.password) ||
									(values.password === '' && touched.password)
										? [styles.input, styles.inputError]
										: styles.input
								}
								secureTextEntry={true}
							/>
							{errors.password && touched.password ? (
								<Text style={styles.errorText}>{errors.password}</Text>
							) : (
								<Spacer size="xl" />
							)}
							<Spacer size="xxxl" />
							<Spacer size="xl" />
							<Pressable
								accessibilityRole="button"
								accessibilityLabel="log in"
								disabled={
									values.emailAddress === '' ||
									values.password === '' ||
									errors.emailAddress
								}
								style={
									values.emailAddress === '' ||
									values.password === '' ||
									errors.emailAddress
										? [styles.loginButton, styles.disableLoginButton]
										: styles.loginButton
								}
								onPress={handleSubmit}
							>
								<Text style={{color: 'white', fontSize: 24}}>Log in</Text>
							</Pressable>
						</View>
					</>
				)
			}}
		</Formik>
	)
}

export default LoginForm

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: 250,
		borderWidth: 3,
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
	errorText: {
		fontSize: 15,
		height: 20
	},
	loginButton: {
		backgroundColor: '#642CA9',
		height: 50,
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		color: 'white'
	},
	disableLoginButton: {
		backgroundColor: '#F1F2F6',
		borderColor: '#642CA9',
		borderWidth: 3,
		color: '#B5B5B5'
	},
	inputError: {
		borderColor: 'red'
	}
})
