import {View, StyleSheet, Image} from 'react-native'
import LoginForm from '../forms/loginForm'
import ScreenBase from '../components/ScreenBase'

function LogIn() {
	// useEffect(() => {
	// 	navigation.addListener('beforeRemove', e => {
	// 		e.preventDefault()
	// 	})
	// }, [navigation])

	// const navigateToRegister = () => {
	// 	navigation.navigate('Register')
	// }

	return (
		<ScreenBase>

			<View style={{alignItems: 'center'}}>
				<Image
					style={styles.logo}
					source={require('../assets/easyShopLogo.png')}
					accessible={true}
					accessibilityLabel={'Easy shop logo'}
					/>
				<LoginForm />
			</View>
					</ScreenBase>
	)
}

const styles = StyleSheet.create({
	logo: {
		height: 170,
		width: 200
	}
})

export default LogIn
