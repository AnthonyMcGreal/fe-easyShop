import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import {useNavigation} from '@react-navigation/native'
import ScreenBase from '../../../components/ScreenBase'

function RecipesHome() {
	const navigation = useNavigation()

	const navigate = pageName => {
		navigation.navigate(`${pageName}`)
	}

	return (
		<ScreenBase>
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
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('UpdateRecipe')}
				buttonText={'Update a recipe'}
			/>
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('DeleteRecipe')}
				buttonText={'Delete a recipe'}
			/>
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('AddIngredient')}
				buttonText={'Add an ingredient'}
			/>
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('DeleteIngredient')}
				buttonText={'Delete an ingredient'}
			/>
		</ScreenBase>
	)
}

const styles = StyleSheet.create({
	logo: {
		height: 200,
		width: 200
	}
})

export default RecipesHome
