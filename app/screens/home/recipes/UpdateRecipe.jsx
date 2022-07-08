import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getRecipes } from '../../../api'

function UpdateRecipe({navigation}) {
  const [recipes, setRecipes] = useState([])
  const [recipeNames, setRecipeNames] = useState([])
  const [recipeToUpdate, setRecipeToUpdate] = useState(0)
  const [getRecipesHasBeenCalled, setGetRecipesHasBeenCalled]= useState(false)


  useEffect(async() => {
    const items = await getRecipes()
    setRecipes(items.data.recipes)
    setGetRecipesHasBeenCalled(true)
    setRecipeNames(recipes.map(recipe => recipe.recipe_name))
  }, [getRecipesHasBeenCalled])

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Pick a recipe to update</Text>
        <SelectDropdown 
          data={recipeNames}
          onSelect={(selectedRecipe) => {
            setRecipeToUpdate(selectedRecipe);
          }}
          buttonTextAfterSelection={(selectedRecipe) => {
            return `${selectedRecipe}`;
          }}
          renderDropdownIcon={() => {
            return <FontAwesomeIcon icon={faChevronDown} />;
          }}
          buttonStyle={styles.dropDownStyle}
          buttonTextStyle={styles.dropDownText}
          rowStyle={styles.rowStyle}
      />
      </View>
      <Pressable
        style={styles.button}
        disabled={!recipeToUpdate}
        onPress = {() => navigation.navigate('UpdateRecipeIngredients',{
          recipe_name:recipeToUpdate
        })}
        >
        <Text style={styles.text}>Update Item</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d556d',
    width: '100%',
  },
  contentContainer:{
    height:'40%',
    width: '80%',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Nunito',
  },
  dropDownStyle: {
      width: 200,
      height: 50,
      margin: 12,
      borderWidth: 1,
      backgroundColor: 'lightgrey',
      marginBottom: 60,
  },
  dropDownText: {
    lineHeight: 20,
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: 'Nunito',
  },
  rowStyle: {
    backgroundColor: 'lightgrey',
  },
  modelContainer:{
    backgroundColor:'#2d556d',
    width:'80%',
    height:500,
    borderColor: '#6D2D55',
    borderWidth: 5,
    borderRadius:25,
    display:'flex',
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  afterActionText:{
    color:'#6D2D55',
    fontSize:30,
    textAlign:'center',
    marginBottom: 70,
    fontFamily: 'Nunito',
    textShadowColor: 'white',
    textShadowRadius: 12,
  },
  button: {
    backgroundColor: '#6D2D55',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: '#6D2D55',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft:"auto",
    marginRight:"auto"
  },
});

export default UpdateRecipe;