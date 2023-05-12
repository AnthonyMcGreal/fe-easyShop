import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Button from '../../components/Button'
import Spacer from '../../components/Spacer'
import ScreenBase from '../../components/ScreenBase'

function Home() {
	const navigation = useNavigation()

	const navigate = pageName => {
		navigation.navigate(`${pageName}`)
	}

	return (
		<ScreenBase>
			<Image
				style={styles.logo}
				source={require('../../assets/easyShopLogo.png')}
				accessible={true}
				accessibilityLabel={'Easy shop logo'}
			/>
			<Button
				onPress={() => navigate('MealPlansHome')}
				buttonText={'Meal plans'}
			/>
			<Spacer spaceRequired={4} />
			<Button onPress={() => navigate('RecipesHome')} buttonText={'Recipes'} />
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('MiscItems')}
				buttonText={'Misc. items'}
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

export default Home
