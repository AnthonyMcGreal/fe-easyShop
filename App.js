import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import WelcomeScreen from './app/screens/WelcomeScreen'
import LogIn from './app/screens/LogIn'
import Home from './app/screens/home/Home'
import MealPlan from './app/screens/home/mealPlans/MealPlan'
import RecipesHome from './app/screens/home/recipes/RecipesHome'
import ViewMealPlans from './app/screens/home/mealPlans/ViewMealPlans'
import MiscItems from './app/screens/home/miscItems/MiscItems'
import AddMiscItems from './app/screens/home/miscItems/AddMiscItems'
import DeleteMiscItem from './app/screens/home/miscItems/DeleteMiscItem'
import AddNewRecipe from './app/screens/home/recipes/AddNewRecipe'
import UpdateRecipe from './app/screens/home/recipes/UpdateRecipe'
import DeleteRecipe from './app/screens/home/recipes/DeleteRecipe'
import AddIngredient from './app/screens/home/recipes/AddIngredient'
import DeleteIngredient from './app/screens/home/recipes/DeleteIngredient'
import AddIngredientToRecipe from './app/screens/home/recipes/AddIngredientToRecipe'
import UpdateRecipeIngredients from './app/screens/home/recipes/UpdateRecipeIngredients'

export default function App() {
	const Stack = createStackNavigator()

	return (
		<NavigationContainer style={{flex: 1, backgroundColor: 'transparent'}}>
			<Stack.Navigator>
				<Stack.Screen
					name="WelcomeScreen"
					component={WelcomeScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="LogIn"
					component={LogIn}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="MealPlan"
					component={MealPlan}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="RecipesHome"
					component={RecipesHome}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="ViewMealPlans"
					component={ViewMealPlans}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="MiscItems"
					component={MiscItems}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="AddMiscItems"
					component={AddMiscItems}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="DeleteMiscItems"
					component={DeleteMiscItem}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="AddNewRecipe"
					component={AddNewRecipe}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="UpdateRecipe"
					component={UpdateRecipe}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="DeleteRecipe"
					component={DeleteRecipe}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="AddIngredient"
					component={AddIngredient}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="DeleteIngredient"
					component={DeleteIngredient}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="AddIngredientToRecipe"
					component={AddIngredientToRecipe}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="UpdateRecipeIngredients"
					component={UpdateRecipeIngredients}
					options={{headerShown: false}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
