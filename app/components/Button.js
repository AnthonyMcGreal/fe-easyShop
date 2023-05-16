import React from 'react'
import Text from './Text'
import {StyleSheet, Pressable} from 'react-native'

const Button = ({onPress, buttonText, disabled}) => {
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityLabel={`${buttonText}`}
			style={disabled ? [styles.button, styles.disabled] : styles.button}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={[styles.text, {color: disabled? '#A4A4A4': 'white'}]}>{`${buttonText}`}</Text>
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
		fontSize: 16
	},
	disabled: {
		backgroundColor: '#F1F2F6',
		borderColor: '#642CA9',
		borderWidth: 3,
	}
})

export default Button
