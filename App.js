import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import WelcomeScreen from './app/screens/WelcomeScreen'
import LogIn from './app/screens/LogIn'
import Register from './app/screens/Register'
import Home from './app/screens/home/Home'
import CreateMealPlan from './app/screens/home/mealPlans/CreateMealPlan'
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
import AddRecipeToMealPlan from './app/screens/home/mealPlans/AddRecipeToMealPlan'
import MealPlansHome from './app/screens/home/mealPlans/MealPlansHome'
import DeleteMealPlans from './app/screens/home/mealPlans/DeleteMealPlan'
import ShoppingList from './app/screens/home/mealPlans/ShoppingList'
import AddMiscItemsToShoppingList from './app/screens/home/mealPlans/AddMiscItemsToShoppingList'

import {UserProvider} from './app/components/UserContext'
import {AuthProvider} from './app/components/AuthContext'

export default function App() {
	const Stack = createStackNavigator()

	return (
		<AuthProvider>
			<UserProvider>
				<NavigationContainer style={{flex: 1, backgroundColor: '#2d556d'}}>
					<Stack.Navigator screenOptions={{presentation: 'transparentModal'}}>
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
							name="Register"
							component={Register}
							options={{headerShown: false}}
						/>
						<Stack.Screen
							name="Home"
							component={Home}
							options={{headerShown: false}}
						/>
						<Stack.Screen
							name="CreateMealPlan"
							component={CreateMealPlan}
							options={{headerShown: false}}
						/>
						<Stack.Screen
							name="MealPlansHome"
							component={MealPlansHome}
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
							name="DeleteMealPlans"
							component={DeleteMealPlans}
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
						<Stack.Screen
							name="AddRecipeToMealPlan"
							component={AddRecipeToMealPlan}
							options={{headerShown: false}}
						/>
						<Stack.Screen
							name="ShoppingList"
							component={ShoppingList}
							options={{headerShown: false}}
						/>
						<Stack.Screen
							name="AddMiscItemsToShoppingList"
							component={AddMiscItemsToShoppingList}
							options={{headerShown: false}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</UserProvider>
		</AuthProvider>
	)
}
