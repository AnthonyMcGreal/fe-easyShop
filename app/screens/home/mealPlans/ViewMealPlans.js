import {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {getMealPlans, getMealPlanByName} from '../../../api'
import {useUserContext} from '../../../components/UserContext'
import {useAuthContext} from '../../../components/AuthContext'

function ViewMealPlans({navigation}) {
	const user = useUserContext()
	const token = useAuthContext()

	const [mealPlanNames, setMealPlanNames] = useState([])
	const [selectedMealPlan, setSelectedMealPlan] = useState('')
	const [getMealPlansHasBeenCalled, setGetMealPlansHasBeenCalled] =
		useState(false)

	useEffect(() => {
		const awaitGetMealPlans = async () => {
			const plans = await getMealPlans(user.user_id, token)
			const names = plans.data.mealPlans.map(plan => plan.name)
			setMealPlanNames(names)
			setGetMealPlansHasBeenCalled(false)
		}
		awaitGetMealPlans()
	}, [getMealPlansHasBeenCalled])

	async function handleUpdateMealPlan() {
		const getMealPlan = await getMealPlanByName(
			selectedMealPlan,
			user.user_id,
			token
		)
		const mealPlanToUpdate = getMealPlan.data.meals[0]
		const name = selectedMealPlan
		const mealPlanLength = mealPlanToUpdate.recipes.length
		const mealPlanDays = mealPlanToUpdate.recipes.map(
			days => Object.keys(days)[0]
		)
		navigation.navigate('AddRecipeToMealPlan', {
			mealPlanName: name,
			mealPlanLength: mealPlanLength,
			mealPlanDays: mealPlanDays,
			mealPlan: mealPlanToUpdate,
			route: 'ViewMealPlans'
		})
	}

	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<Text style={styles.text}>Pick a meal plan to update</Text>
				<SelectDropdown
					data={mealPlanNames}
					onSelect={selectedRecipe => {
						setSelectedMealPlan(selectedRecipe)
					}}
					buttonTextAfterSelection={selectedRecipe => {
						return `${selectedRecipe}`
					}}
					renderDropdownIcon={() => {
						return <FontAwesomeIcon icon={faChevronDown} />
					}}
					buttonStyle={styles.dropDownStyle}
					buttonTextStyle={styles.dropDownText}
					rowStyle={styles.rowStyle}
				/>
			</View>
			<Pressable
				style={styles.button}
				disabled={!selectedMealPlan}
				onPress={handleUpdateMealPlan}
			>
				<Text style={styles.text}>View/Update meal plan</Text>
			</Pressable>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2d556d',
		width: '100%'
	},
	contentContainer: {
		height: 150,
		width: '80%',
		alignItems: 'center'
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito'
	},
	dropDownStyle: {
		width: 250,
		height: 50,
		margin: 12,
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		marginBottom: 60
	},
	dropDownText: {
		lineHeight: 20,
		fontSize: 16,
		paddingLeft: 10,
		fontFamily: 'Nunito'
	},
	rowStyle: {
		backgroundColor: 'lightgrey'
	},
	modelContainer: {
		backgroundColor: '#2d556d',
		width: '80%',
		height: 500,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	afterActionText: {
		color: '#6D2D55',
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 70,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 12
	},
	button: {
		backgroundColor: '#6D2D55',
		width: 250,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	modalButton: {
		backgroundColor: '#6D2D55',
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginLeft: 'auto',
		marginRight: 'auto'
	}
})

export default ViewMealPlans
