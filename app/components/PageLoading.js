import {StyleSheet, ActivityIndicator} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

const PageLoading = () => {
	return (
		<SafeAreaView style={styles.background}>
			<ActivityIndicator size="large" color="#6D2D55" animating={true} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white'
	}
})

export default PageLoading
