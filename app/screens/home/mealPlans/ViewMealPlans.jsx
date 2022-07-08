import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

function ViewMealPlans(props) {
	return (
		<SafeAreaView style={styles.background}>
			<Text>View Meal Plan Page</Text>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default ViewMealPlans
