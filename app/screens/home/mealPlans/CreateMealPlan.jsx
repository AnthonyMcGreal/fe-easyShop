import {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TextInput} from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

function CreateMealPlan({navigation}) {
	const [mealPlanName, setMealPlanName] = useState('')
	const [mealPlanLength, setMealPlanLength] = useState('')
	const [disableButton, setDisableButton] = useState(true)
	const [dayMealPlanStarts, setDayMealPlanStarts] = useState('')
	const [mealPlanDays, setMealPlanDays] = useState([])
	const mealPlanDaysOptions = [1, 2, 3, 4, 5, 6, 7]
	const days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday'
	]

	useEffect(() => {
		if (mealPlanName && mealPlanLength) setDisableButton(false)
	}, [mealPlanName, mealPlanLength])

	const handleNameChange = val => {
		const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
		setMealPlanName(formattedVal)
	}

	const handleMealPlanLengthChange = val => {
		setMealPlanLength(val)
	}

	const handleStartDay = val => {
		setDayMealPlanStarts(val)
	}

	useEffect(() => {
		const startingIndex = days.indexOf(dayMealPlanStarts)
		const daysList = []
		for (let i = startingIndex; i < startingIndex + mealPlanLength; i++) {
			if (i > 6) {
				daysList.push(days[i - 7])
			} else {
				daysList.push(days[i])
			}
		}
		setMealPlanDays(daysList)
	}, [mealPlanLength, dayMealPlanStarts])

	return (
		<SafeAreaView style={styles.background}>
			<Text style={styles.text}>Meal plan name</Text>
			<TextInput
				style={styles.input}
				value={mealPlanName}
				onChangeText={handleNameChange}
			/>
			<Text style={styles.text}>Meal plan start day</Text>
			<SelectDropdown
				data={days}
				onSelect={handleStartDay}
				buttonTextAfterSelection={() => dayMealPlanStarts}
				renderDropdownIcon={() => <FontAwesomeIcon icon={faChevronDown} />}
				buttonStyle={styles.dropDownStyle}
				buttonTextStyle={styles.dropDownText}
				rowStyle={styles.rowStyle}
			/>
			<Text style={styles.text}>Number of days in meal plan</Text>
			<SelectDropdown
				data={mealPlanDaysOptions}
				onSelect={handleMealPlanLengthChange}
				buttonTextAfterSelection={() => mealPlanLength}
				renderDropdownIcon={() => <FontAwesomeIcon icon={faChevronDown} />}
				buttonStyle={styles.dropDownStyle}
				buttonTextStyle={styles.dropDownText}
				rowStyle={styles.rowStyle}
			/>
			<Pressable
				style={styles.button}
				disabled={disableButton}
				onPress={() =>
					navigation.navigate('AddRecipeToMealPlan', {
						mealPlanName: mealPlanName,
						mealPlanLength: mealPlanLength,
						mealPlanDays: mealPlanDays,
						mealPlan: {},
						route: 'CreateMealPlan'
					})
				}
			>
				<Text style={styles.text}>Add Ingredients to Recipe</Text>
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
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito'
	},
	input: {
		height: 50,
		width: 250,
		margin: 12,
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Nunito'
	},
	dropDownStyle: {
		width: 250,
		height: 50,
		margin: 12,
		borderWidth: 1,
		backgroundColor: 'lightgrey'
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
	button: {
		backgroundColor: '#6D2D55',
		width: 250,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 60
	}
})

export default CreateMealPlan
