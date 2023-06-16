import {StyleSheet, Pressable} from 'react-native'
import Text from './Text'

const RoundButton = ({onPress, buttonText}) => {
	return (
		<Pressable
			style={styles.roundButton}
			disabled={false}
			onPress={async () => {
				onPress()
			}}
		>
			<Text style={styles.roundButtonText}>{buttonText}</Text>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	roundButton: {
		backgroundColor: '#642CA9',
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50
	},
	roundButtonText: {
		color: 'white',
		fontSize: 50,
		fontFamily: 'Nunito',
		marginBottom: 10
	}
})

export default RoundButton
