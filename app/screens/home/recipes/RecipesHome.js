import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'

function RecipesHome({navigation}) {
	const navigate = pageName => {
		navigation.navigate(`${pageName}`)
	}

	return (
		<SafeAreaView style={styles.background}>
			<Image
				style={styles.logo}
				source={require('../../../assets/easyShopLogo.png')}
				accessible={true}
				accessibilityLabel={'Easy shop logo'}
			/>
			<Button
				onPress={() => navigate('AddNewRecipe')}
				buttonText={'Add a new recipe'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('UpdateRecipe')}
				buttonText={'Update a recipe'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('DeleteRecipe')}
				buttonText={'Delete a recipe'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('AddIngredient')}
				buttonText={'Add an ingredient'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('DeleteIngredient')}
				buttonText={'Delete an ingredient'}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		width: '100%'
	},
	logo: {
		height: 200,
		width: 200
	}
})

export default RecipesHome
