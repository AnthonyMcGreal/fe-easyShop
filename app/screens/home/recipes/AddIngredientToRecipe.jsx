import {useState, useEffect} from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator,FlatList  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {getIngredients} from '../../../api';

const AddIngredientToRecipe = ({navigation, route}) => {

    const [ingredientsInRecipe, setIngredientsInRecipe] = useState([]);
    const [modalVisible, setModalVisible] = useState('false');
    const [usersIngredients, setUsersIngredients] = useState([])
    const [selectedIngredientToAdd, setSelectedIngredientToAdd] = useState('') 
    const [selectedItemUOM, setItemSelectedUOM] = useState("")
    const [selectedItemStorageType, setSelectedItemStorageType] = useState("")
    const [quantity, setQuantity] = useState(0)

    const recipe_name = route.params.recipe_name
    const link = route.params.link
    const portions = route.params.portions


    useEffect( async () => {
        const items = await getIngredients()
        setUsersIngredients(items.data.ingredients)
      },[]);

    useEffect(() => {
      setIngredientsInRecipe([{name:"cornflakes"},{name:"milk"}])
    },[])

    useEffect(() => {
      let selectedQuantity = ""
      let selectedIngredientStorageType = ""
      for(let i=0; i<usersIngredients.length; i++){
        if(usersIngredients[i].name === selectedIngredientToAdd){
          selectedQuantity = usersIngredients[i].unit_of_measurement
          selectedIngredientStorageType = usersIngredients[i].storage_type
        }
      }
      setItemSelectedUOM(selectedQuantity)
      setSelectedItemStorageType(selectedIngredientStorageType)
    }, [selectedIngredientToAdd])

    const handleAddIngredientSelection = (selectedIngredient) => {
      setSelectedIngredientToAdd(selectedIngredient);
      setQuantity(0)
    }

    const handleQuantityChange = (quantity) => {
      setQuantity(quantity)
    }

    const handleAddIngredientToRecipe = () => {
      let newIngredient = {
          recipe_name:recipe_name,
          link:link,
          name:selectedIngredientToAdd,
          ingredient_quantity:quantity,
          unit_of_measurement: selectedItemUOM,
          portions:portions,
          storage_type: selectedItemStorageType
        }
      
      setIngredientsInRecipe([...ingredientsInRecipe,newIngredient])
      setModalVisible(false)
    }

    return (
        <SafeAreaView style={styles.background}>
            <Modal
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(false);
                }}
            >
                <View style={styles.background}>
                <View style={styles.modelContainer}>
                <Text>Pick an ingredient:</Text>
                <SelectDropdown 
                    data={usersIngredients.map(ingredient => `${ingredient.name}`)}
                    onSelect={handleAddIngredientSelection}
                    buttonTextAfterSelection={selectedIngredient => `${selectedIngredient}`}
                    renderDropdownIcon={() => <FontAwesomeIcon icon={faChevronDown} />}
                    buttonStyle={styles.addIngredientDropDownStyle}
                    buttonTextStyle={styles.dropDownText}
                    rowStyle={styles.rowStyle}
                />
                <Text>Enter ingredient quantity({selectedItemUOM}):</Text>
                <TextInput
                    style={styles.input}
                    value={`${quantity}`}
                    onChangeText={handleQuantityChange}
                />
                <Pressable
                    style={styles.button}
                    disabled={!quantity>0 && !selectedIngredientToAdd}
                    onPress={handleAddIngredientToRecipe}
                >
                    <Text style={styles.text}>Add to recipe</Text>
                </Pressable> 
                </View>
                </View>
            </Modal>
            <View  style={styles.flatListContainer}>
            <FlatList
                style={styles.flatList}
                data={ingredientsInRecipe}
                renderItem={({item}) => <Text style={styles.listText}>{item.name}</Text>}>
            </FlatList>
            </View>
            <Pressable
            style={styles.button}
            disabled={false}
            onPress={async() => {setModalVisible(true)}}
            >
            <Text style={styles.text}>Add Ingredient</Text>
            </Pressable>          
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2d556d',
      width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Nunito',
      },
      button: {
        backgroundColor: '#6D2D55',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop:60
      },
      addIngredientDropDownStyle: {
        width: '80%',
        height: 50,
        margin: 50,
        borderWidth: 1,
        backgroundColor: 'lightgrey',
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
        alignItems:"center"
      },
      input: {
        height: 50,
        width: '60%',
        margin: 12,
        borderWidth: 1,
        backgroundColor: 'lightgrey',
        fontSize: 16,
        textAlign:"center",
        fontFamily: 'Nunito',
      },
      flatListContainer:{
        width:"80%",
        height:400
      },
      flatList:{
        backgroundColor:'white',
      },
      listText:{
        color:"black",
        fontSize:20
      }
})

export default AddIngredientToRecipe;