import {Text as RNText, StyleSheet} from 'react-native'

const Text = ({children, size = 24}) => {
	return <RNText style={[styles.text, {fontSize: size}]}>{children}</RNText>
}

const styles = StyleSheet.create({
	text: {
		fontFamily: 'Nunito'
	}
})

export default Text
