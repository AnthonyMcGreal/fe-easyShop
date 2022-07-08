import { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    Pressable,
    Modal,
    View,
    FlatList,
    ActivityIndicator,
  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIngredients, getRecipeByName } from "../../../api";

const UpdateRecipeIngredients = ({ navigation, route }) => {
    const [ingredientsInRecipe, setIngredientsInRecipe] = useState([]);
    
    const [addModalVisible, setAddModalVisible] = useState("false");
    const [removeModalVisible, setRemoveModalVisible] = useState("false")
    const [confirmModalVisible, setConfirmModalVisible] = useState("false")
    const [submitModalVisible, setSubmitModalVisible] = useState("false")

    const [selectedIngredientToAdd, setSelectedIngredientToAdd] = useState("");
    const [selectedItemUOM, setItemSelectedUOM] = useState("");
    const [selectedItemStorageType, setSelectedItemStorageType] = useState("");
    const [selectedIngredientId, setSelectedIngredientId] = useState("")

    const [usersIngredients, setUsersIngredients] = useState([]);

    const [apiResult, setApiResult] = useState(0)

    const recipe_name = route.params.recipe_name;

    useEffect(async () => {
        const items = await getIngredients();
        const recipe = await getRecipeByName(recipe_name)
        setUsersIngredients(items.data.ingredients);
        setIngredientsInRecipe(recipe.data)
      }, []);

      useEffect(() => {
        let selectedQuantity = "";
        let selectedIngredientStorageType = "";
        let selectedIngredientId = "";
        for (let i = 0; i < usersIngredients.length; i++) {
          if (usersIngredients[i].name === selectedIngredientToAdd) {
            selectedQuantity = usersIngredients[i].unit_of_measurement;
            selectedIngredientStorageType = usersIngredients[i].storage_type;
            selectedIngredientId = usersIngredients[i].ingredient_id
          }
        }
        setItemSelectedUOM(selectedQuantity);
        setSelectedItemStorageType(selectedIngredientStorageType);
        setSelectedIngredientId(selectedIngredientId)
      }, [selectedIngredientToAdd]);  

    return (
        <SafeAreaView style={styles.background}>
        {/* confirm recipe modal */}        
            <Modal
            animationType="fade"
            visible={confirmModalVisible}
            onRequestClose={() => {
            setConfirmModalVisible(false);
            }}
        >
        <View style={styles.background}>
        <View style={styles.flatListContainer}>
        <Text style={styles.title}>{recipe_name}</Text>
        <FlatList
          style={styles.flatList}
          data={ingredientsInRecipe}
          renderItem={({ item, index }) => (
              <Text style={styles.text}>
              - {item.name} ({item.ingredient_quantity} {item.unit_of_measurement})
              </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
      </View>
          <Pressable 
          style={styles.button}
          onPress={() => {
            confirmRecipe(ingredientsInRecipe)
          }}>
            <Text style={styles.text}>
              Confirm recipe?
            </Text>
          </Pressable>
        </View>
      </Modal> 

            {/* submit recipe modal */}  
      <Modal
      animationType="fade"
      visible={submitModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setSubmitModalVisible(!modalVisible);
      }}
      >
        <View style={styles.background}>
          <View style={styles.recipeAddedContainer}>
         {apiResult===201? <View><Text style={styles.afterActionText}>Recipe Added</Text>{backButton()}</View>:null}
         {apiResult===500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong on our side, try again later</Text>{backButton()}</View>:null}
         {apiResult >0 && apiResult!== 201 && apiResult !==500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong, try again</Text>{backButton()}</View>:null}
         {apiResult === 0? <ActivityIndicator size="large" color='#6D2D55' animating={true}/>: null}
          </View>
        </View>
      </Modal>
      {/*Update recipe screen */}
            <View style={styles.flatListContainer}>
                <Text style={styles.title}>{recipe_name}</Text>
                <FlatList
          style={styles.flatList}
          data={ingredientsInRecipe}
          renderItem={({ item }) => (
            <Text style={styles.text} key={item.id}>
              - {item.name} ({item.ingredient_quantity} {item.unit_of_measurement})
              </Text>
          )}
          keyExtractor={(item, index) => index.toString()}
        ></FlatList>
      </View>
      <View style={styles.buttonContainer}> 
        <Pressable
          style={styles.roundButton}
          disabled={false}
          onPress={async () => {
            setAddModalVisible(true)
          }}
          >
          <Text style={styles.roundButtonText}>+</Text>
        </Pressable>
        <Pressable
          style={styles.roundButton}
          disabled={ingredientsInRecipe.length===0}
          onPress={() => {
            setRemoveModalVisible(true)
          }}
          >
          <Text style={styles.roundButtonText}>-</Text>
        </Pressable>
      </View>
      <View>
        <Pressable 
        style={styles.button}
        disabled={ingredientsInRecipe.length===0}
        onPress={async () => {
          setConfirmModalVisible(true)
        }}>
          <Text style={styles.text}>
            Update Recipe
          </Text>
        </Pressable>
      </View>
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
        background: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2d556d",
          width: "100%",
        },
        buttonContainer:{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-around",
          width:"100%",
        },
        text: {
          color: "white",
          fontSize: 18,
          fontFamily: "Nunito",
        },
        button: {
          backgroundColor: "#6D2D55",
          width: 200,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginTop: 50,
        },
        roundButton: {
          backgroundColor: "#6D2D55",
          width: 80,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
        },
        roundButtonText: {
          color: "white",
          fontSize: 50,
          fontFamily: "Nunito",
          marginBottom:10
        },
        addIngredientDropDownStyle: {
          width: "80%",
          height: 50,
          borderWidth: 1,
          backgroundColor: 'lightgrey',
        },
        dropDownText: {
          lineHeight: 20,
          fontSize: 16,
          paddingLeft: 10,
          fontFamily: "Nunito",
        },
        rowStyle: {
          backgroundColor: "lightgrey",
        },
        modelContainer: {
          backgroundColor: "#2d556d",
          width: "80%",
          height: 500,
          alignItems: "center",
          display:"flex",
          justifyContent:"space-between"
        },
        removeModelContainer:{
          backgroundColor: "#2d556d",
          width: "80%",
          height: 300,
          alignItems: "center",
          display:"flex",
          justifyContent:"space-between"
        },
        input: {
          height: 50,
          width: "80%",
          borderWidth: 1,
          backgroundColor: "lightgrey",
          fontSize: 16,
          textAlign: "center",
          fontFamily: "Nunito",
        },
        flatListContainer: {
          width: "80%",
          height: 400,
        },
        flatList: {
          backgroundColor: "#2d556d",
        },
        listText: {
          color: "white",
          fontSize: 20,
          backgroundColor: "#2d556d"
        },
        title:{
          color: "white",
          fontSize:30,
          fontFamily: "Nunito",
          textAlign:"center",
          marginBottom:10,
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
        recipeAddedContainer:{
          backgroundColor:'#2d556d',
          width:'80%',
          height:'80%',
          borderColor: '#6D2D55',
          borderWidth: 5,
          borderRadius:25,
          display:'flex',
          flexDirection:'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
      });

export default UpdateRecipeIngredients;