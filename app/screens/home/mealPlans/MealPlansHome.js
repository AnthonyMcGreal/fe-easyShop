import React from 'react'
import {StyleSheet, Image} from 'react-native'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import {useNavigation} from '@react-navigation/native'
import ScreenBase from '../../../components/ScreenBase'

function MealPlansHome() {
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
				onPress={() => navigate('CreateMealPlan')}
				buttonText={'Create a meal plan'}
			/>
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('ViewMealPlans')}
				buttonText={'View/Update a meal plan'}
			/>
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('DeleteMealPlans')}
				buttonText={'Delete a meal plan'}
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

export default MealPlansHome
