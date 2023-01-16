import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavLink from '../../components/NavLink'

function Home({ navigation }) {
	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<View>
					<Text style={styles.name}>EasyShop</Text>
				</View>
				<View style={styles.buttonContainer}>
					<NavLink navigation={navigation} navigateToPage={'MealPlansHome'} buttonText={'Meal plans'} />
					<NavLink navigation={navigation} navigateToPage={'RecipesHome'} buttonText={'Recipes'} />
					<NavLink navigation={navigation} navigateToPage={'MiscItems'} buttonText={'Misc. items'} />
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#2d556d',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		height: '90%',
		width: '80%',
		alignItems: 'center'
	},
	name: {
		color: '#6D2D55',
		fontSize: 50,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 12,
		textAlign: 'center',
		paddingTop: 10,
		width: 350,
		height: 85,
		margin: '10%'
	},
	buttonContainer: {
		height: 300,
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

export default Home
