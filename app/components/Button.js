import React from 'react'
import Text from './Text'
import {StyleSheet, Pressable} from 'react-native'

const Button = ({onPress, buttonText}) => {
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={`${buttonText}`}
			style={styles.button}
			onPress={onPress}
		>
			<Text style={styles.text}>{`${buttonText}`}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#642CA9',
		width: 250,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50
	},
	text: {
		color: 'white',
		fontSize: 16
	}
})

export default Button
