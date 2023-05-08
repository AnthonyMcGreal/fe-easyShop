import {View, StyleSheet} from 'react-native'

const Spacer = ({spaceRequired = 1}) => {
	return <View style={[styles.spacer, {height: 5 * spaceRequired}]} />
}

const styles = StyleSheet.create({
	spacer: {
		width: '100%'
	},
	s: {
		height: 5
	},
	m: {
		height: 10
	},
	l: {
		height: 15
	},
	xl: {
		height: 20
	},
	xxl: {
		height: 25
	},
	xxxl: {
		height: 30
	}
})

export default Spacer
