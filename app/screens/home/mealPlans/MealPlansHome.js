import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import {useNavigation} from '@react-navigation/native'

function MealPlansHome() {
	const navigation = useNavigation()

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
				onPress={() => navigate('CreateMealPlan')}
				buttonText={'Create a meal plan'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('ViewMealPlans')}
				buttonText={'View/Update a meal plan'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('DeleteMealPlans')}
				buttonText={'Delete a meal plan'}
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

export default MealPlansHome
