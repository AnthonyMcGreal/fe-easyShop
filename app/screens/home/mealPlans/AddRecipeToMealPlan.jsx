import {useState, useEffect} from 'react'
import {getRecipes} from '../../../api'
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
    const mealPlanName = route.params.mealPlanName;
    const mealPlanLength = route.params.mealPlanLength;

    const [availableRecipes, setAvailableRecipes] = useState([])
    const [mealPlan, setMealPlan] = useState({})
    const [daysAvailable, setDaysAvailable] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState('')
    const [selectedDay, setSelectedDay] = useState('')
    const [dailyRecipeList, setDailyRecipeList]= useState('')
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [removeModalVisible, setRemoveModalVisible] = useState(false)
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    useEffect( async () => {
        const usersRecipes = await getRecipes()
        const recipeNames = usersRecipes.data.recipes.map(recipe => {return recipe.recipe_name})
        setAvailableRecipes(recipeNames)
        const daysAvailable = []
        const mealPlan = {
            mealPlanName:mealPlanName,
            mealPlanLength: mealPlanLength,
            recipes:[]
        }
        for(let i = 1; i<= mealPlanLength; i++){
            mealPlan.recipes.push({[`Day${i}`] : ["Test Recipe"]})
            daysAvailable.push(`Day ${i}`)
        }
        setMealPlan(mealPlan)
        setDaysAvailable(daysAvailable)
    },[])

    const handleRecipeSelection = selectedRecipe => {
		setSelectedRecipe(selectedRecipe)
	}

    const handleDaySelection = selectedDay => {
        const dayNumber = selectedDay.slice(-1)
        setSelectedDay(selectedDay)
        setDailyRecipeList(mealPlan.recipes[(dayNumber-1)][`Day${dayNumber}`])
    }

    const handleAddRecipeToMealPlan = () => {
        const dayNumber = selectedDay.slice(-1)
        mealPlan.recipes[(dayNumber-1)][`Day${dayNumber}`].push(selectedRecipe)
        setAddModalVisible(false)
    }

    const handleRemoveRecipeFromMealPlan = () => {
        const dayNumber = selectedDay.slice(-1)
        const mealPlanCopy = [...mealPlan.recipes[(dayNumber-1)][`Day${dayNumber}`]]
        const updatedDailyPlan = mealPlanCopy.filter(recipe => recipe !== selectedRecipe)
        mealPlan.recipes[(dayNumber-1)][`Day${dayNumber}`] = updatedDailyPlan
        setRemoveModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.background}>

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
                            data={daysAvailable}
                            onSelect={handleDaySelection}
                            buttonTextAfterSelection={selectedDay =>
                                `${selectedDay}`
                            }
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
							buttonTextAfterSelection={selectedRecipe =>
								`${selectedRecipe}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<Pressable
							style={styles.button}
							disabled={!selectedRecipe}
							onPress={handleRemoveRecipeFromMealPlan}
						>
							<Text style={styles.text}>Remove meal</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

{// Add recipe modal
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
							buttonTextAfterSelection={selectedRecipe =>
								`${selectedRecipe}`
							}
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
							buttonTextAfterSelection={selectedDay =>
								`${selectedDay}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<Pressable
							style={styles.button}
							disabled={!selectedRecipe}
							onPress={handleAddRecipeToMealPlan}
						>
							<Text style={styles.text}>Add to meal plan</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

{// Base Screen
}
            <Text style={styles.title}>{mealPlanName}</Text>
            <FlatList
                style={styles.flatList}
			    data={mealPlan.recipes}
				renderItem={({item}) => (
                    <View>
                    <Text style={styles.subTitle} key={item.id}>
                        Day {(mealPlan.recipes.indexOf(item)+1)}
                    </Text>
                            <FlatList
                            style={styles.flatList}
                            data={mealPlan.recipes[mealPlan.recipes.indexOf(item)][`Day${(mealPlan.recipes.indexOf(item)+1)}`]}
                            renderItem={({item}) => (
                                <Text style={styles.text} key={item.id}>
                                    {item}
                                </Text>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            ></FlatList>
                </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
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
					//disabled={ingredientsInRecipe.length === 0}
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
					// disabled={ingredientsInRecipe.length === 0}
					onPress={async () => {
						setConfirmModalVisible(true)
					}}
				>
					<Text style={styles.text}>Add Recipe</Text>
				</Pressable>
			</View>
        </SafeAreaView>

    );
};

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
		fontFamily: 'Nunito'
	},
	button: {
		backgroundColor: '#6D2D55',
		width: 200,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 50
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
		width: '80%',
		height: 400
	},
	flatList: {
		backgroundColor: '#2d556d'
	},
	listText: {
		color: 'white',
		fontSize: 20,
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
		textAlign: 'center',
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
	}
})

export default AddRecipeToMealPlan;