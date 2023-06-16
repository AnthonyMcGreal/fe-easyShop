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
		width: 60,
		height: 60,
		alignItems: 'center',
		borderRadius: 50
		
	},
	roundButtonText: {
		color: 'white',
		padding: 'auto',
		textAlign: 'center',
		fontSize: 50,
		lineHeight: 60,
	}
})

export default RoundButton
