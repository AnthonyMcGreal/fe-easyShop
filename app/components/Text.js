import {Text as RNText, StyleSheet} from 'react-native'

const Text = ({children, style, size = 24}) => {
	return <RNText style={[styles.text, {fontSize: size}, style]}>{children}</RNText>
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Nunito'
	}
})

export default Text
