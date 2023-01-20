import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

const NavLink = ({navigation, navigateToPage, buttonText}) => {
	return (
		<Pressable
			style={styles.button}
			onPress={() => {
				navigation.navigate(`${navigateToPage}`)
			}}
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
		fontFamily: 'Nunito',
		fontSize: 16
	}
})

export default NavLink
