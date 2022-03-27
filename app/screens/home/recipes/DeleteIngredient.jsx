import { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {getIngredients, deleteIngredientById} from '../../../api';

const DeleteMiscItem = ({navigation}) => {
 const [ingredients, setIngredients] = useState([])
 const [ingredientNames, setIngredientNames] = useState([]);
 const [ingredientToDelete, setIngredientToDelete] = useState('')
 const [ingredientIdToDeleted ,setIngredientIdToDeleted] = useState()
 const [modalVisible, setModalVisible] = useState(true)
 const [apiResult, setApiResult] = useState(0)
 const [getIngredientsBeenCalled, setGetIngredientsBeenCalled] = useState(false)

  useEffect( async () => {
   const items = await getIngredients()
   setIngredients(items.data.ingredients)
   setApiResult(items.status)
   setGetIngredientsBeenCalled(true)
   setIngredientNames(ingredients.map((ingredient) => ingredient.name))
   setModalVisible(false)
  }, [getIngredientsBeenCalled]);
  
  useEffect(() => {
    const ingredientId = ingredients.filter((ingredient) => ingredient.name === ingredientToDelete).map((ingredient) => {return ingredient.ingredient_id})
    setIngredientIdToDeleted(ingredientId[0])
  },[ingredientToDelete])

  const handleDeleteIngredientButton = async () => {
    setModalVisible(true)
    let result = await deleteIngredientById(ingredientIdToDeleted )
    setApiResult(result.status)
  }


  const backButton = () => {
    return (
      <Pressable 
        style={styles.afterActionButton} 
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
        Alert.alert("Modal has been closed.");
        setModalVisible(modalVisible);
      }}
      >
        <View style={styles.background}>
          <View style={styles.modelContainer}>
            {apiResult===204? <View><Text style={styles.afterActionText}>Ingredient Deleted</Text>{backButton()}</View>:null}
            {apiResult >0 && apiResult !==204? <View><Text style={styles.afterActionText}>Ooops! Something went wrong, try again</Text>{backButton()}</View>:null}
            {apiResult === 0? <ActivityIndicator size="large" color='#6D2D55' animating={true}/>: null}
          </View>
        </View> 
      </Modal>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Pick an ingredient to delete</Text>
        <SelectDropdown 
          data={ingredientNames}
          onSelect={(selectedIngredient, index) => {
            setIngredientToDelete(selectedIngredient);
          }}
          buttonTextAfterSelection={(selectedIngredient, index) => {
            return `${selectedIngredient}`;
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
        disabled={!ingredientToDelete}
        onPress = {() => handleDeleteIngredientButton()}
        >
        <Text style={styles.text}>Delete Ingredient</Text>
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
        width: '60%',
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
      height:'80%',
      borderColor: '#6D2D55',
      borderWidth: 5,
      borderRadius:25,
    },
    button: {
      backgroundColor: '#6D2D55',
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    afterActionText:{
      color:'#6D2D55',
      fontSize:30,
      textAlign:'center',
      marginBottom: 70,
      marginTop:120,
      fontFamily: 'Nunito',
      textShadowColor: 'white',
      textShadowRadius: 12,
    },
    afterActionButton: {
      backgroundColor: '#6D2D55',
      width: "70%",
      height: 50,
      marginLeft:"15%",
      marginTop:60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
});

export default DeleteMiscItem;