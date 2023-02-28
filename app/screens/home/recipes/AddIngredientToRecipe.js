import {useState, useEffect} from 'react'
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
import {TextInput} from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {getIngredients, addRecipe} from '../../../api'
import {useUserContext} from '../../../components/UserContext'
import {useAuthContext} from '../../../components/AuthContext'

const AddIngredientToRecipe = ({navigation, route}) => {
	const user = useUserContext()
	const token = useAuthContext()

	const [ingredientsInRecipe, setIngredientsInRecipe] = useState([])
	const [addModalVisible, setAddModalVisible] = useState('false')
	const [removeModalVisible, setRemoveModalVisible] = useState('false')
	const [confirmModalVisible, setConfirmModalVisible] = useState('false')
	const [submitModalVisible, setSubmitModalVisible] = useState('false')
	const [usersIngredients, setUsersIngredients] = useState([])
	const [selectedIngredientToAdd, setSelectedIngredientToAdd] = useState('')
	const [selectedIngredientToRemove, setSelectedIngredientToRemove] =
		useState('')
	const [selectedItemUOM, setItemSelectedUOM] = useState('')
	const [selectedItemStorageType, setSelectedItemStorageType] = useState('')
	const [selectedIngredientId, setSelectedIngredientId] = useState('')
	const [quantity, setQuantity] = useState('')
	const [apiResult, setApiResult] = useState(0)

	const recipe_name = route.params.recipe_name
	const link = route.params.link
	const portions = route.params.portions

	useEffect(() => {
		const asyncIngredients = async () => {
			const items = await getIngredients(user.user_id, token)
			setUsersIngredients(items.data.ingredients)
		}
		asyncIngredients()
	}, [])

	useEffect(() => {
		let selectedQuantity = ''
		let selectedIngredientStorageType = ''
		let selectedIngredientId = ''
		for (let i = 0; i < usersIngredients.length; i++) {
			if (usersIngredients[i].name === selectedIngredientToAdd) {
				selectedQuantity = usersIngredients[i].unit_of_measurement
				selectedIngredientStorageType = usersIngredients[i].storage_type
				selectedIngredientId = usersIngredients[i].ingredient_id
			}
		}
		setItemSelectedUOM(selectedQuantity)
		setSelectedItemStorageType(selectedIngredientStorageType)
		setSelectedIngredientId(selectedIngredientId)
	}, [selectedIngredientToAdd])

	const handleAddIngredientSelection = selectedIngredient => {
		setSelectedIngredientToAdd(selectedIngredient)
		setQuantity('')
	}

	const handleQuantityChange = quantity => {
		if (quantity >= 0) {
			setQuantity(quantity)
		} else {
			setQuantity('')
		}
	}

	const handleAddIngredientToRecipe = () => {
		let newIngredient = {
			recipe_name: recipe_name,
			link: link,
			name: selectedIngredientToAdd,
			ingredient_quantity: quantity,
			unit_of_measurement: selectedItemUOM,
			portions: portions,
			storage_type: selectedItemStorageType,
			ingredients: selectedIngredientId
		}

		setIngredientsInRecipe([...ingredientsInRecipe, newIngredient])
		setQuantity('')
		setAddModalVisible(false)
	}

	const handleRemoveIngredientFromRecipe = () => {
		setIngredientsInRecipe(
			ingredientsInRecipe.filter(
				ingredient => ingredient.name !== selectedIngredientToRemove
			)
		)
		setRemoveModalVisible(false)
	}

	const handleRemoveIngredientSelection = selectedIngredient => {
		setSelectedIngredientToRemove(selectedIngredient)
	}

	const confirmRecipe = async ingredientsInRecipe => {
		setSubmitModalVisible(true)
		const recipeToSubmit = ingredientsInRecipe.map(ingredient => {
			return {
				ingredients: ingredient.ingredients,
				recipe_name: ingredient.recipe_name,
				link: ingredient.link,
				ingredient_quantity: ingredient.ingredient_quantity,
				portions: ingredient.portions
			}
		})
		const result = await addRecipe(recipeToSubmit, user.user_id, token)
		setApiResult(result)
	}

	const backButton = () => {
		return (
			<Pressable
				style={styles.button}
				onPress={() => {
					navigation.navigate('RecipesHome')
				}}
			>
				<Text style={styles.text}>Back to Recipes</Text>
			</Pressable>
		)
	}

	return (
		<SafeAreaView style={styles.background}>
			{/* add an ingredient modal */}

			<Modal
				animationType="fade"
				visible={addModalVisible}
				onRequestClose={() => {
					setAddModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.modelContainer}>
						<Text style={styles.text}>Pick an ingredient:</Text>
						<SelectDropdown
							data={usersIngredients.map(ingredient => `${ingredient.name}`)}
							onSelect={handleAddIngredientSelection}
							buttonTextAfterSelection={selectedIngredient =>
								`${selectedIngredient}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<Text style={styles.text}>Enter quantity({selectedItemUOM}):</Text>
						<TextInput
							style={styles.input}
							value={`${quantity}`}
							onChangeText={handleQuantityChange}
						/>
					</View>
					<Pressable
						style={styles.button}
						disabled={!quantity > 0 && !selectedIngredientToAdd}
						onPress={handleAddIngredientToRecipe}
					>
						<Text style={styles.text}>Add to recipe</Text>
					</Pressable>
				</View>
			</Modal>

			{/* Remove an ingredient modal */}

			<Modal
				animationType="fade"
				visible={removeModalVisible}
				onRequestClose={() => {
					setRemoveModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.removeModelContainer}>
						<Text style={styles.text}>Select an ingredient :</Text>
						<SelectDropdown
							data={ingredientsInRecipe.map(ingredient => `${ingredient.name}`)}
							onSelect={handleRemoveIngredientSelection}
							buttonTextAfterSelection={selectedIngredient =>
								`${selectedIngredient}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
					</View>
					<Pressable
						style={styles.button}
						onPress={handleRemoveIngredientFromRecipe}
					>
						<Text style={styles.text}>Remove from recipe</Text>
					</Pressable>
				</View>
			</Modal>

			{/* confirm recipe modal */}

			<Modal
				animationType="fade"
				visible={confirmModalVisible}
				onRequestClose={() => {
					setConfirmModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.flatListContainer}>
						<Text style={styles.title}>{recipe_name}</Text>
						<FlatList
							style={styles.flatList}
							data={ingredientsInRecipe}
							renderItem={({item, index}) => (
								<Text style={styles.text}>
									- {item.name} ({item.ingredient_quantity}{' '}
									{item.unit_of_measurement})
								</Text>
							)}
							keyExtractor={(item, index) => index.toString()}
						></FlatList>
					</View>
					<Pressable
						style={styles.button}
						onPress={() => {
							confirmRecipe(ingredientsInRecipe)
						}}
					>
						<Text style={styles.text}>Confirm recipe?</Text>
					</Pressable>
				</View>
			</Modal>
			{/* submit recipe modal */}
			<Modal
				animationType="fade"
				visible={submitModalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
					setSubmitModalVisible(!modalVisible)
				}}
			>
				<View style={styles.background}>
					<View style={styles.recipeAddedContainer}>
						{apiResult === 201 ? (
							<View>
								<Text style={styles.afterActionText}>Recipe Added</Text>
								{backButton()}
							</View>
						) : null}
						{apiResult === 500 ? (
							<View>
								<Text style={styles.afterActionText}>
									Ooops! Something went wrong, try again
								</Text>
								{backButton()}
							</View>
						) : null}
						{apiResult > 0 && apiResult !== 201 && apiResult !== 500 ? (
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
			{/* add recipe screen */}
			<View style={styles.flatListContainer}>
				<Text style={styles.title}>{recipe_name}</Text>
				<FlatList
					style={styles.flatList}
					data={ingredientsInRecipe}
					renderItem={({item}) => (
						<Text style={styles.text} key={item.id}>
							- {item.name} ({item.ingredient_quantity}{' '}
							{item.unit_of_measurement})
						</Text>
					)}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.roundButton}
					disabled={false}
					onPress={async () => {
						setAddModalVisible(true)
					}}
				>
					<Text style={styles.roundButtonText}>+</Text>
				</Pressable>
				<Pressable
					style={styles.roundButton}
					disabled={ingredientsInRecipe.length === 0}
					onPress={() => {
						setRemoveModalVisible(true)
					}}
				>
					<Text style={styles.roundButtonText}>-</Text>
				</Pressable>
			</View>
			<View>
				<Pressable
					style={styles.button}
					disabled={ingredientsInRecipe.length === 0}
					onPress={async () => {
						setConfirmModalVisible(true)
					}}
				>
					<Text style={styles.text}>Add Recipe</Text>
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
		width: '100%',
		height: '100%'
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
		width: 250,
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
		width: 250,
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
		height: 200,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	removeModelContainer: {
		backgroundColor: '#2d556d',
		width: 250,
		height: 100,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between'
	},
	input: {
		height: 50,
		width: 250,
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
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})

export default AddIngredientToRecipe