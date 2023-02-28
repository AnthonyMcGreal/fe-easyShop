import {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {TextInput} from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

function AddNewRecipe({navigation}) {
	const [recipeName, setRecipeName] = useState('')
	const [recipeLink, setRecipeLink] = useState('')
	const [recipePortionSize, setRecipePortionSize] = useState('')
	const [disableButton, setDisableButton] = useState(true)
	const portionSizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	useEffect(() => {
		if (recipeName && recipePortionSize) setDisableButton(false)
	}, [recipeName, recipePortionSize])

	const handleNameChange = val => {
		const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
		setRecipeName(formattedVal)
	}

	const handleLinkChange = val => {
		setRecipeLink(val)
	}

	const handlePortionSizeChange = val => {
		setRecipePortionSize(val)
	}

	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<Text style={styles.text}>Recipe name</Text>
				<TextInput
					style={styles.input}
					value={recipeName}
					onChangeText={handleNameChange}
				/>
				<Text style={styles.text}>Link to recipe</Text>
				<TextInput
					style={styles.input}
					value={recipeLink}
					onChangeText={handleLinkChange}
				/>
				<Text style={styles.text}>Portion size</Text>
				<SelectDropdown
					data={portionSizeOptions}
					onSelect={handlePortionSizeChange}
					buttonTextAfterSelection={() => recipePortionSize}
					renderDropdownIcon={() => <FontAwesomeIcon icon={faChevronDown} />}
					buttonStyle={styles.dropDownStyle}
					buttonTextStyle={styles.dropDownText}
					rowStyle={styles.rowStyle}
				/>
				<Pressable
					style={styles.button}
					disabled={disableButton}
					onPress={() =>
						navigation.navigate('AddIngredientToRecipe', {
							recipe_name: recipeName,
							link: recipeLink,
							portions: recipePortionSize
						})
					}
				>
					<Text style={styles.text}>Add Ingredients to Recipe</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#2d556d',
		width: '100%'
	},
	contentContainer: {
		marginTop: 80,
		width: '80%',
		alignItems: 'center'
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

export default AddNewRecipe
