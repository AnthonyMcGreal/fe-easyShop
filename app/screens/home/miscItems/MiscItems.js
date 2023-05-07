import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import {useNavigation} from '@react-navigation/native'

function MiscItems() {
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
				onPress={() => navigate('AddMiscItems')}
				buttonText={'Add a misc. Item'}
			/>
			<Spacer size="xl" />
			<Button
				onPress={() => navigate('DeleteMiscItems')}
				buttonText={'Delete a misc. Item'}
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
export default MiscItems
