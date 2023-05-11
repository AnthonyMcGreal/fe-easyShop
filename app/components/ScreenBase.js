import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

const ScreenBase = ({children}) => {
	return <SafeAreaView style={styles.background}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		width: '100%'
	}
})

export default ScreenBase
