import { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getRecipes, deleteRecipeByName } from '../../../api'

function DeleteRecipe({navigation}) {
  const [recipes, setRecipes] = useState([])
  const [recipeNames, setRecipeNames] = useState([])
  const [recipeToDelete, setRecipeToDelete] = useState(0)
  const [modalVisible, setModalVisible] = useState(true)
  const [apiResult, setApiResult] = useState(0)
  const [getRecipesHasBeenCalled, setGetRecipesHasBeenCalled]= useState(false)

  useEffect(async() => {
    const items = await getRecipes()
    setRecipes(items.data.recipes)
    setApiResult(items.status)
    setGetRecipesHasBeenCalled(true)
    setRecipeNames(recipes.map(recipe => recipe.recipe_name))
    setModalVisible(false)
  }, [getRecipesHasBeenCalled])

  const handleDeleteRecipeButton = async() => {
    setModalVisible(true)
    let result = await deleteRecipeByName(recipeToDelete)
    setApiResult(result.status)
  }

  const backButton = () => {
    return (
      <Pressable 
        style={styles.modalButton} 
        onPress={() => {
          navigation.navigate('RecipesHome');
        }}>
        <Text style={styles.text}>Back to Recipes</Text>
      </Pressable>
      )}

  return (
    <SafeAreaView style={styles.background}>
       <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(modalVisible);
      }}
      >
        <View style={styles.background}>
          <View style={styles.modelContainer}>
            {apiResult===204? <View><Text style={styles.afterActionText}>Recipe Deleted</Text>{backButton()}</View>:null}
            {apiResult >0 && apiResult !==204? <View><Text style={styles.afterActionText}>Ooops! Something went wrong, try again</Text>{backButton()}</View>:null}
            {apiResult === 0? <ActivityIndicator size="large" color='#6D2D55' animating={true}/>: null}
          </View>
        </View> 
      </Modal>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Pick a recipe to delete</Text>
        <SelectDropdown 
          data={recipeNames}
          onSelect={(selectedRecipe) => {
            setRecipeToDelete(selectedRecipe);
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
        disabled={!recipeToDelete}
        onPress = {() => handleDeleteRecipeButton()}
        >
        <Text style={styles.text}>Delete Item</Text>
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

export default DeleteRecipe;