import {useEffect, useState} from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import ScreenBase from '../../../components/ScreenBase'
import Text from '../../../components/Text'
import RoundButton from '../../../components/RoundButton'
import Button from '../../../components/Button'
import Spacer from '../../../components/Spacer'
import AddIngredientToRecipeModal from '../../../Models/AddIngredientToRecipeModal'
import RemoveIngredientFromRecipeModal from '../../../Models/RemoveIngredientFromRecipeModal'
import ConfrimIngredientsInRecipeModal from '../../../Models/ConfirmIngredientsInRecipeModal'
import useAddRecipe from '../../../hooks/useAddRecipe'
import SubmitRecipeModal from '../../../Models/SubmitRecipeModal'
import useGetRecipes from '../../../hooks/useGetRecipes'
import useDeleteRecipe from '../../../hooks/useDeleteRecipe'

const PORTION_SIZES = [1, 2, 3, 4, 5, 6, 7, 8]

const AddRecipeToMealPlan = ({route}) => {

  const mealPlanName = route.params.mealPlanName
	const mealPlanLength = route.params.mealPlanLength
	const mealPlanDays = route.params.mealPlanDays
	const mealPlanToUpdate = route.params.mealPlan
	const previousPage = route.params.route

	const [availableRecipes, setAvailableRecipes] = useState([])
  const [mealPlan, setMealPlan] = useState({})
  const [daysAvailable, setDaysAvailable] = useState([])
	const [selectedRecipe, setSelectedRecipe] = useState('')
	const [selectedDay, setSelectedDay] = useState('')
	const [selectedPortionSize, setSelectionPortionSize] = useState('')

  const {hasError, isLoading, recipes, getRecipes} = useGetRecipes()

  let dayIndex = mealPlanDays.indexOf(selectedDay) || 0

  useEffect(() => {
    if(previousPage === 'CreateMealPlan') {
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
    }

    getRecipes()
    const recipeNames = recipes.map(recipe => {
      return recipe.recipe_name
    })
    setAvailableRecipes(recipeNames)
    },[])

  const displayAddRecipeModal = () => {setIsAddRecipeModalModal(true)}  
  const displayRemoveRecipeModal = () => {setIsRemoveRecipeModalVisible(true)}
  const onPressCompleteMealPlan = () => {setIsConfirmModalVisible(true)}

  return (
    <ScreenBase>
      <Text style={styles.title}>{mealPlanName}</Text>
			<Spacer spaceRequired={7} />
      <View style={styles.flatListContainer}>
      <FlatList
					data={mealPlan.recipes}
					renderItem={({item}) => (
						<View>
							<Text size={22} style={styles.subTitle} key={item.id}>
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
									<Text size={18} key={item.id}>
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
			<Spacer spaceRequired={7} />
      <View style={styles.buttonContainer}>
				<RoundButton onPress={displayAddRecipeModal} buttonText={'+'} />
				<RoundButton onPress={displayRemoveRecipeModal} buttonText={'-'} />
			</View>
      <Spacer spaceRequired={7} />
      <Button
				onPress={onPressCompleteMealPlan}
				buttonText={'Confirm meal plam'}
				disabled={false}
			/>
			<Spacer spaceRequired={7} />
    </ScreenBase>
  )
}

const styles = StyleSheet.create({
	flatListContainer: {
		width: '85%',
		height: 400,
		flex: 1
	},
  title: {
		fontSize: 30,
		textAlign: 'center',
		marginBottom: 10
	},
  flatList: {
		overflow: 'scroll'
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '70%'
	},
  subTitle: {
		textDecorationLine: 'underline'
	}
})

export default AddRecipeToMealPlan