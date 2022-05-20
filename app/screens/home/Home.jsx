import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }) {
  
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.contentContainer}>
      <View>
          <Text style={styles.name}>EasyShop</Text>
        </View>
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
            navigation.navigate('RecipesHome');
          }}
          >
          <Text style={styles.text}>Recipes</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('MiscItems');
          }}
          >
          <Text style={styles.text}>Misc. item</Text>
        </Pressable>
      </View>
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
  contentContainer:{
    height:'90%',
    width: '80%',
    alignItems: 'center'
  },
  name: {
    color: '#6D2D55',
    fontSize: 50,
    fontFamily: 'Nunito',
    textShadowColor: 'white',
    textShadowRadius: 12,
    width: '100%',
    margin:'10%'
  },
  buttonContainer: {
    height: '65%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6D2D55',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'Nunito',
    fontSize:16
  },
});

export default Home;