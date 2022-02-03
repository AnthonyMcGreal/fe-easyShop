import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('MealPlan');
          }}
        >
          <Text style={styles.text}>Create a meal plan</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('ViewMealPlans');
          }}
        >
          <Text style={styles.text}>View meal plans</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('NewRecipe');
          }}
        >
          <Text style={styles.text}>Add a new recipe</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('AddMiscItems');
          }}
        >
          <Text style={styles.text}>Add a misc. item</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2d556d',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6D2D55',
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});

export default Home;
