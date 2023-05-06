import {useEffect} from 'react'
import {Formik} from 'formik'
import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	ActivityIndicator
} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'
import useLogin from '../hooks/useLogin'
import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
	emailAddress: Yup.string()
		.matches(/^\S+@\S+$/, '*Not a valid email address')
		.required('*Email address is required'),
	password: Yup.string().required('*Password is required')
})

const LoginForm = () => {
	const {isloggingIn, hasloginFailed, isLoginSuccessful, login} = useLogin()
	const navigation = useNavigation()

	useEffect(() => {
		if (isLoginSuccessful) navigation.navigate('Home')
	}, [isLoginSuccessful])

	return (
		<Formik
			initialValues={{emailAddress: '', password: ''}}
			initialTouched={{emailAddress: false, password: false}}
			onSubmit={values => login(values.emailAddress, values.password)}
			validationSchema={loginSchema}
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
							{hasloginFailed ? (
								<Text style={styles.errorText}> *Log in failed :( </Text>
							) : (
								<Spacer size="xl" />
							)}
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
								{isloggingIn ? (
									<ActivityIndicator
										size="small"
										color="#FFFFFF"
										accessibilityLabel="logging in"
										animating={true}
									/>
								) : (
									<Text style={{color: 'white', fontSize: 24}}>Log in</Text>
								)}
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
