import {View, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import LoginForm from '../forms/loginForm'

function LogIn({navigation}) {
	// useEffect(() => {
	// 	navigation.addListener('beforeRemove', e => {
	// 		e.preventDefault()
	// 	})
	// }, [navigation])

	// const navigateToRegister = () => {
	// 	navigation.navigate('Register')
	// }

	return (
		<SafeAreaView style={styles.background}>
			<View style={{alignItems: 'center'}}>
				<Image
					style={styles.logo}
					source={require('../assets/easyShopLogo.png')}
					accessible={true}
					accessibilityLabel={'Easy shop logo'}
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
