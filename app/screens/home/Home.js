import React from 'react'
import {View, Text, StyleSheet, Pressable, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../components/Button'

function Home({navigation}) {
	const navigate = pageName => {
		navigation.navigate(`${pageName}`)
	}

	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<View>
					<Image
						style={styles.logo}
						source={require('../../assets/easyShopLogo.png')}
						accessible={true}
						accessibilityLabel={'Easy shop logo'}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						onPress={() => navigate('MealPlansHome')}
						buttonText={'Meal plans'}
					/>
					<Button
						onPress={() => navigate('RecipesHome')}
						buttonText={'Recipes'}
					/>
					<Button
						onPress={() => navigate('MiscItems')}
						buttonText={'Misc. items'}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'white',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		height: '90%',
		width: '80%',
		alignItems: 'center'
	},
	logo: {
		height: 200,
		width: 200
	},
	buttonContainer: {
		height: 300,
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

export default Home
