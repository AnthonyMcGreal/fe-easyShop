import {useState, useEffect} from 'react'
import {getRecipes, addMealPlan} from '../../../api'
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

const AddRecipeToMealPlan = ({navigation, route}) => {
	const mealPlanName = route.params.mealPlanName
	const mealPlanLength = route.params.mealPlanLength
	const mealPlanDays = route.params.mealPlanDays

	const [rawRecipes, setRawRecipes] = useState([])
	const [availableRecipes, setAvailableRecipes] = useState([])
	const [mealPlan, setMealPlan] = useState({})
	const [daysAvailable, setDaysAvailable] = useState([])
	const [selectedRecipe, setSelectedRecipe] = useState('')
	const [selectedDay, setSelectedDay] = useState('')
	const [dailyRecipeList, setDailyRecipeList] = useState('')
	const [addModalVisible, setAddModalVisible] = useState(false)
	const [removeModalVisible, setRemoveModalVisible] = useState(false)
	const [confirmModalVisible, setConfirmModalVisible] = useState(false)
	const [saveModalVisible, setSaveModalVisible] = useState(false) 
	const [apiResult, setApiResult] = useState(0)

	let dayIndex = mealPlanDays.indexOf(selectedDay) || 0

	useEffect(async () => {
		const usersRecipes = await getRecipes()
		const recipeNames = usersRecipes.data.recipes.map(recipe => {
			return recipe.recipe_name
		})
		setRawRecipes(usersRecipes.data.recipes)
		setAvailableRecipes(recipeNames)
		const daysAvailable = []
		const mealPlan = {
			mealPlanName: mealPlanName,
			mealPlanLength: mealPlanLength,
			recipes: []
		}
		for (let i = 0; i < mealPlanLength; i++) {
			mealPlan.recipes.push({[mealPlanDays[i]]: []})
			daysAvailable.push(mealPlanDays[i])
		}
		setMealPlan(mealPlan)
		setDaysAvailable(daysAvailable)
	}, [])

	const handleRecipeSelection = selectedRecipe => {
		dayIndex = mealPlanDays.indexOf(selectedDay)
		setSelectedRecipe(selectedRecipe)
	}

	const handleDaySelection = selectedDay => {
		dayIndex = mealPlanDays.indexOf(selectedDay)
		const availableRecipesForThisDay = mealPlan.recipes[dayIndex][
			selectedDay
		].map(recipe => recipe.recipe_name)
		setSelectedDay(selectedDay)
		setDailyRecipeList(availableRecipesForThisDay)
	}

	const handleAddRecipeToMealPlan = () => {
		const recipe = rawRecipes.find(
			recipe => recipe.recipe_name === selectedRecipe
		)
		mealPlan.recipes[dayIndex][selectedDay].push(recipe)
		setAddModalVisible(false)
		setSelectedDay('')
	}

	const handleRemoveRecipeFromMealPlan = () => {
		const mealPlanCopy = [...mealPlan.recipes[dayIndex][selectedDay]]
		const updatedDailyPlan = mealPlanCopy.filter(
			recipe => recipe.recipe_name !== selectedRecipe
		)
		mealPlan.recipes[dayIndex][selectedDay] = updatedDailyPlan
		setRemoveModalVisible(false)
	}

	const submitMealPlan = async () => {
		setSaveModalVisible(true)
		let result = await addMealPlan(mealPlan)
		setApiResult(result)
	}

	const saveAndContinue = () => {}

	const backButton = () => {
		return (
			<Pressable
				style={styles.backButton}
				onPress={() => {
					navigation.navigate('Home')
				}}
			>
				<Text style={styles.text}>Back to home page</Text>
			</Pressable>
		)
	}

	return (
		<SafeAreaView style={styles.background}>
			<Modal
				animationType="fade"
				visible={confirmModalVisible}
				onRequestClose={() => {
					setAddModalVisible(false)
				}}
			>
				<Modal
				animationType="fade"
				visible={saveModalVisible}
				onRequestClose={() => {
					setSaveModalVisible(modalVisible)
				}}
			>
				<View style={styles.background}>
					<View style={styles.saveMealPlanModal}>
						{apiResult === 201 ? (
							<View>
								<Text style={styles.afterActionText}>Meal plan saved</Text>
								{backButton()}
							</View>
						) : null}
						{apiResult > 0 && apiResult !== 201 ? (
							<View>
								<Text style={styles.afterActionText}>
									Ooops! Something went wrong, try again
								</Text>
								{backButton()}
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
				<View style={styles.background}>
					<Text style={styles.title}>{mealPlanName}</Text>
					<View style={styles.flatListContainer}>
						<FlatList
							data={mealPlan.recipes}
							renderItem={({item}) => (
								<View>
									<Text style={styles.subTitle} key={item.id}>
										{daysAvailable[mealPlan.recipes.indexOf(item)]}
									</Text>
									<FlatList
										style={styles.flatList}
										data={
											mealPlan.recipes[mealPlan.recipes.indexOf(item)][
												daysAvailable[mealPlan.recipes.indexOf(item)]
											]
										}
										renderItem={({item}) => (
											<Text style={styles.listText} key={item.id}>
												• {item.recipe_name} - {item.portions} portions
											</Text>
										)}
										keyExtractor={(item, index) => index.toString()}
									></FlatList>
								</View>
							)}
							keyExtractor={(item, index) => index.toString()}
						></FlatList>
					</View>
					<Pressable style={styles.button} onPress={submitMealPlan}>
						<Text style={styles.text}>Save meal plan</Text>
					</Pressable>
					<Pressable style={styles.button} onPress={saveAndContinue}>
						<Text style={styles.text}>Create a shopping list</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => {
							setConfirmModalVisible(false)
						}}
					>
						<Text style={styles.text}>Back</Text>
					</Pressable>
				</View>
			</Modal>
			<Modal
				animationType="fade"
				visible={removeModalVisible}
				onRequestClose={() => {
					setAddModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.modelContainer}>
						<Text style={styles.text}>Pick a day</Text>
						<SelectDropdown
							data={daysAvailable.filter(
								(day, index) =>
									Object.keys(mealPlan.recipes[index][day]).length !== 0
							)}
							onSelect={handleDaySelection}
							buttonTextAfterSelection={selectedDay => `${selectedDay}`}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<Text style={styles.text}>Pick a recipe to remove:</Text>
						<SelectDropdown
							disabled={selectedRecipe}
							data={dailyRecipeList}
							onSelect={handleRecipeSelection}
							buttonTextAfterSelection={selectedRecipe => `${selectedRecipe}`}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<View>
							<Pressable
								style={styles.button}
								disabled={!selectedRecipe}
								onPress={handleRemoveRecipeFromMealPlan}
							>
								<Text style={styles.text}>Remove meal</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => setRemoveModalVisible(false)}
							>
								<Text style={styles.text}>Back</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{
				// Add recipe modal
			}
			<Modal
				animationType="fade"
				visible={addModalVisible}
				onRequestClose={() => {
					setAddModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.modelContainer}>
						<Text style={styles.text}>Pick a recipe:</Text>
						<SelectDropdown
							data={availableRecipes}
							onSelect={handleRecipeSelection}
							buttonTextAfterSelection={selectedRecipe => `${selectedRecipe}`}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<Text style={styles.text}>Pick a day</Text>
						<SelectDropdown
							data={daysAvailable}
							onSelect={handleDaySelection}
							buttonTextAfterSelection={selectedDay => `${selectedDay}`}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<View>
							<Pressable
								style={styles.button}
								disabled={!selectedRecipe || !selectedDay}
								onPress={handleAddRecipeToMealPlan}
							>
								<Text style={styles.text}>Add to meal plan</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => setAddModalVisible(false)}
							>
								<Text style={styles.text}>Back</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{
				// Base Screen
			}
			<Text style={styles.title}>{mealPlanName}</Text>
			<View style={styles.flatListContainer}>
				<FlatList
					data={mealPlan.recipes}
					renderItem={({item}) => (
						<View>
							<Text style={styles.subTitle} key={item.id}>
								{daysAvailable[mealPlan.recipes.indexOf(item)]}
							</Text>
							<FlatList
								style={styles.flatList}
								data={
									mealPlan.recipes[mealPlan.recipes.indexOf(item)][
										daysAvailable[mealPlan.recipes.indexOf(item)]
									]
								}
								renderItem={({item}) => (
									<Text style={styles.listText} key={item.id}>
										• {item.recipe_name} - {item.portions} portions
									</Text>
								)}
								keyExtractor={(item, index) => index.toString()}
							></FlatList>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.roundButton}
					onPress={async () => {
						setAddModalVisible(true)
					}}
				>
					<Text style={styles.roundButtonText}>+</Text>
				</Pressable>
				<Pressable
					style={styles.roundButton}
					disabled={mealPlan.length === 0}
					onPress={() => {
						setSelectedRecipe('')
						setRemoveModalVisible(true)
					}}
				>
					<Text style={styles.roundButtonText}>-</Text>
				</Pressable>
			</View>
			<View>
				<Pressable
					style={styles.button}
					onPress={() => {
						setConfirmModalVisible(true)
					}}
				>
					<Text style={styles.text}>Confirm meal plan </Text>
				</Pressable>
			</View>
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
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'center'
	},
	listText: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'left'
	},
	button: {
		backgroundColor: '#6D2D55',
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 30
	},
	roundButton: {
		backgroundColor: '#6D2D55',
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50
	},
	roundButtonText: {
		color: 'white',
		fontSize: 50,
		fontFamily: 'Nunito',
		marginBottom: 10
	},
	addIngredientDropDownStyle: {
		width: '80%',
		height: 50,
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
	modelContainer: {
		backgroundColor: '#2d556d',
		width: '80%',
		height: 500,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between'
	},
	removeModelContainer: {
		backgroundColor: '#2d556d',
		width: '80%',
		height: 300,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between'
	},
	input: {
		height: 50,
		width: '80%',
		borderWidth: 1,
		backgroundColor: 'lightgrey',
		fontSize: 16,
		textAlign: 'center',
		fontFamily: 'Nunito'
	},
	flatListContainer: {
		width: '70%',
		height: 280,
		marginBottom: 20
	},
	flatList: {
		backgroundColor: '#2d556d'
	},
	title: {
		color: 'white',
		fontSize: 30,
		fontFamily: 'Nunito',
		textAlign: 'center',
		marginBottom: 10
	},
	subTitle: {
		color: 'white',
		fontSize: 22,
		fontFamily: 'Nunito',
		textAlign: 'left',
		textDecorationLine: 'underline'
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
	recipeAddedContainer: {
		backgroundColor: '#2d556d',
		width: '80%',
		height: '80%',
		borderColor: '#6D2D55',
		borderWidth: 5,
		borderRadius: 25,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	backButton: {
		backgroundColor: '#6D2D55',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 30
	}
})

export default AddRecipeToMealPlan