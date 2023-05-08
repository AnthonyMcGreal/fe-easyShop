import {View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'

import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'

const ApiFallback = ({goBackScreen, buttonText}) => {
	const navigation = useNavigation()

	return (
		<View style={styles.background}>
			<Text style={styles.text}>Ooops, something went wrong</Text>
			<Spacer spaceRequired={5} />
			<Button
				onPress={() => navigation.navigate(`${goBackScreen}`)}
				buttonText={`Back to ${buttonText}`}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		width: '100%'
	},
	text: {
		fontSize: 24,
		fontFamily: 'Nunito'
	}
})

export default ApiFallback
