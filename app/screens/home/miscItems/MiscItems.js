import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import {useNavigation} from '@react-navigation/native'
import ScreenBase from '../../../components/ScreenBase'

function MiscItems() {
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
				onPress={() => navigate('AddMiscItems')}
				buttonText={'Add a misc. Item'}
			/>
			<Spacer spaceRequired={4} />
			<Button
				onPress={() => navigate('DeleteMiscItems')}
				buttonText={'Delete a misc. Item'}
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
export default MiscItems
