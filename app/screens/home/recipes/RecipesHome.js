import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../../components/Button'

function RecipesHome({navigation}) {
	const navigate = pageName => {
		navigation.navigate(`${pageName}`)
	}

	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<View>
					<Image
						style={styles.logo}
						source={require('../../../assets/easyShopLogo.png')}
						accessible={true}
						accessibilityLabel={'Easy shop logo'}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						onPress={() => navigate('AddNewRecipe')}
						buttonText={'Add a new recipe'}
					/>
					<Button
						onPress={() => navigate('UpdateRecipe')}
						buttonText={'Update a recipe'}
					/>
					<Button
						onPress={() => navigate('DeleteRecipe')}
						buttonText={'Delete a recipe'}
					/>
					<Button
						onPress={() => navigate('AddIngredient')}
						buttonText={'Add an ingredient'}
					/>
					<Button
						onPress={() => navigate('DeleteIngredient')}
						buttonText={'Delete an ingredient'}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		width: '100%'
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

export default RecipesHome
