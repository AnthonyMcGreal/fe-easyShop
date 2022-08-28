import {useState, useEffect} from 'react'
import {getRecipes, addMealPlan, updateMealPlan} from '../../../api'
import {
	Text,
	StyleSheet,
	Pressable,
	Modal,
	View,
	FlatList,
	ActivityIndicator
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

function CheckBulkItems({navigation, route}){
	const recipes = route.params.recipes

	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<View>
				<Text style={styles.text}>CheckBulkItems</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#2d556d',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		height: '90%',
		width: '80%',
		alignItems: 'center'
	},
	name: {
		color: '#6D2D55',
		fontSize: 50,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 12,
		width: '100%',
		margin: '10%'
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'center'
	},
})

export default CheckBulkItems