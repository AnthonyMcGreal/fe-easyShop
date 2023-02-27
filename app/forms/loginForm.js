import {Formik} from 'formik'
import react from 'react'
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import Spacer from '../components/Spacer'

const LoginForm = ({onSubmit}) => {
	const validateForm = values => {
		const errors = {}

		if (!values.emailAddress) {
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
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const isEmailAddressError = errors.emailAddress && touched.emailAddress
				const isPasswordError = errors.password && touched.password
				const isSubmitDisabled =
					isEmailAddressError ||
					isPasswordError ||
					!touched.emailAddress ||
					!touched.password
				return (
					<>
						<View>
							<Text style={styles.text}>Email Address </Text>
							<Spacer />
							<TextInput
								accessibilityLabel="email address input"
								onChangeText={handleChange('emailAddress')}
								onBlur={() => setFieldTouched('emailAddress')}
								value={values.emailAddress}
								style={[
									styles.input,
									isEmailAddressError ? styles.inputError : null
								]}
							/>
							{isEmailAddressError ? (
								<Text style={styles.errorText}>{errors.emailAddress}</Text>
							) : (
								<Spacer size="xl" />
							)}
							<Text style={styles.text}>Password </Text>
							<Spacer />
							<TextInput
								accessibilityLabel="password input"
								onChangeText={handleChange('password')}
								onBlur={() => setFieldTouched('password')}
								value={values.password}
								style={[
									styles.input,
									isPasswordError ? styles.inputError : null
								]}
								secureTextEntry={true}
							/>
							{isPasswordError ? (
								<Text style={styles.errorText}>{errors.password}</Text>
							) : (
								<Spacer size="xl" />
							)}
							<Spacer size="xxxl" />
							<Spacer size="xl" />
							<Pressable
								accessibilityRole="button"
								accessibilityLabel="log in"
								disabled={isSubmitDisabled}
								style={
									isSubmitDisabled
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
