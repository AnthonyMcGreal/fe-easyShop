import React, {useEffect, useState} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Modal,
	Pressable,
	ActivityIndicator
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {getMealPlans, deleteMealPlanByName} from '../../../api'
import {useUserContext} from '../../../components/UserContext'
import {useAuthContext} from '../../../components/AuthContext'

function DeleteMealPlans({navigation}) {
	const user = useUserContext()
	const token = useAuthContext()

	const [mealPlans, setMealPlans] = useState([])
	const [planNames, setPlanNames] = useState([])
	const [mealPlanToDelete, setMealPlanToDelete] = useState('')
	const [modalVisible, setModalVisible] = useState(true)
	const [getMealPlansHasBeenCalled, setMealPlansHasBeenCalled] = useState(false)
	const [apiResult, setApiResult] = useState(0)

	useEffect(() => {
		const asyncGetMealPlans = async() => {
			const mealPlanList = await getMealPlans(user.user_id, token)
			setMealPlans(mealPlanList.data.mealPlans)
			setApiResult(mealPlanList.status)
			setMealPlansHasBeenCalled(true)
			setPlanNames(mealPlans.map(planName => planName.name))
			setModalVisible(false)
		}
		asyncGetMealPlans()
	}, [getMealPlansHasBeenCalled])

	const handleDeleteMealPlanButton = async () => {
		setModalVisible(true)
		let result = await deleteMealPlanByName(
			mealPlanToDelete,
			user.user_id,
			token
		)
		setApiResult(result.status)
	}

	const backButton = (
		<Pressable
			style={styles.button}
			onPress={() => {
				navigation.navigate('MealPlansHome')
			}}
		>
			<Text style={styles.text}>Back to meal plans</Text>
		</Pressable>
	)

	return (
		<SafeAreaView style={styles.background}>
			<Modal
				animationType="fade"
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
					setModalVisible(modalVisible)
				}}
			>
				<View style={styles.background}>
					<View style={styles.modelContainer}>
						{apiResult === 204 ? (
							<View style={styles.contentModalContainer}>
								<Text style={styles.afterActionText}>Meal plan deleted</Text>
								{backButton}
							</View>
						) : null}
						{apiResult > 0 && apiResult !== 204 ? (
							<View style={styles.contentModalContainer}>
								<Text style={styles.afterActionText}>
									Ooops! Something went wrong, try again
								</Text>
								{backButton}
							</View>
						) : null}
						{apiResult === 0 ? (
							<ActivityIndicator
								size="large"
								color="#6D2D55"
								animating={true}
							/>
						) : null}
					</View>
				</View>
			</Modal>

			<View style={styles.contentContainer}>
				<Text style={styles.text}>Pick a meal plan to delete</Text>
				<SelectDropdown
					data={planNames}
					onSelect={(selectedItem, index) => {
						setMealPlanToDelete(selectedItem)
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return `${selectedItem}`
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
				disabled={!mealPlanToDelete}
				onPress={() => handleDeleteMealPlanButton()}
			>
				<Text style={styles.text}>Delete meal plan</Text>
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
	contentModalContainer: {
		height: '60%',
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
		height: '80%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	afterActionText: {
		color: '#6D2D55',
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 30,
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
	}
})

export default DeleteMealPlans
