import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LogIn from './app/screens/LogIn';
import Home from './app/screens/Home';
import MealPlan from './app/screens/MealPlan';
import NewRecipe from './app/screens/NewRecipe';
import ViewMealPlans from './app/screens/ViewMealPlans';
import MiscItems from './app/screens/MiscItems';
import AddMiscItems from './app/screens/AddMiscItems';
import DeleteMiscItem from './app/screens/DeleteMiscItem';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MealPlan"
          component={MealPlan}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewRecipe"
          component={NewRecipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewMealPlans"
          component={ViewMealPlans}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MiscItems"
          component={MiscItems}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddMiscItems"
          component={AddMiscItems}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeleteMiscItems"
          component={DeleteMiscItem}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
