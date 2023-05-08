import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import Button from '../../components/Button'
import Spacer from '../../components/Spacer'

function Home() {
	const navigation = useNavigation()

	const navigate = pageName => {
		navigation.navigate(`${pageName}`)
	}

	return (
		<SafeAreaView style={styles.background}>
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
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'white',
		width: '100%',
		alignItems: 'center'
	},
	logo: {
		height: 200,
		width: 200
	}
})

export default Home
