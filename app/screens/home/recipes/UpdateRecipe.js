import {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {getRecipes} from '../../../api'
import {useUserContext} from '../../../components/UserContext'
import {useAuthContext} from '../../../components/AuthContext'

function UpdateRecipe({navigation}) {
	const user = useUserContext()
	const token = useAuthContext()

	const [recipes, setRecipes] = useState([])
	const [recipeNames, setRecipeNames] = useState([])
	const [recipeToUpdate, setRecipeToUpdate] = useState(0)
	const [getRecipesHasBeenCalled, setGetRecipesHasBeenCalled] = useState(false)

	useEffect(() => {
		const asyncGetRecipes = async () => {
			const items = await getRecipes(user.user_id, token)
			setRecipes(items.data.recipes)
			setGetRecipesHasBeenCalled(true)
			setRecipeNames(recipes.map(recipe => recipe.recipe_name))
		}
		asyncGetRecipes()
	}, [getRecipesHasBeenCalled])

	return (
		<SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<Text style={styles.text}>Pick a recipe to update</Text>
				<SelectDropdown
					data={recipeNames}
					onSelect={selectedRecipe => {
						setRecipeToUpdate(selectedRecipe)
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
				disabled={!recipeToUpdate}
				onPress={() =>
					navigation.navigate('UpdateRecipeIngredients', {
						recipe_name: recipeToUpdate
					})
				}
			>
				<Text style={styles.text}>Update Item</Text>
			</Pressable>
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
		marginTop: 150,
		height: 120,
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
		width: 250,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginLeft: 'auto',
		marginRight: 'auto'
	}
})

export default UpdateRecipe
