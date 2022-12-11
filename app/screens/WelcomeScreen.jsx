import React from 'react'
import {ImageBackground, StyleSheet, Text} from 'react-native'

function WelcomeScreen({navigation}) {
	function timeOut() {
		setTimeout(() => {
			navigation.navigate('LogIn')
		}, 2000)
	}

	timeOut()
	return (
		<ImageBackground
			style={styles.background}
			source={require('../assets/BG2.jpeg')}
		>
			{timeOut()}
			<Text style={styles.title}>EasyShop</Text>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center'
	},
	title: {
		top: '15%',
		color: '#6D2D55',
		fontSize: 60,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 12
	}
})

export default WelcomeScreen
