import {useState} from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {addIngredient} from '../../../api'

function AddIngredient({ navigation }) {
  const [ingredientName, setIngredientName] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [storageType, setStorageType] = useState(''); 
  const [modalVisible, setModalVisible] = useState('false');
  const [apiResult, setApiResult] = useState(0);
  const storageCategories = ['Frozen', 'Chilled', 'Ambient', 'Produce']
  const measurementCategories = ["individual", "tsp","tbsp", "fl oz", "cup", "ml", "l", "lb", "oz", "mg", "g", "kg"]

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
        setModalVisible(false);
      }}
      >
        <View style={styles.background}>
          <View style={styles.modelContainer}>
         {apiResult===201? <View><Text style={styles.afterActionText}>Ingredient Added</Text>{backButton()}</View>:null}
         {apiResult===500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong on our side, try again later</Text>{backButton()}</View>:null}
         {apiResult >0 && apiResult!== 201 && apiResult !==500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong, try again</Text>{backButton()}</View>:null}
         {apiResult === 0? <ActivityIndicator size="large" color='#6D2D55' animating={true}/>: null}
          </View>
        </View>
      </Modal>

      <Text style={styles.text}>Ingredient name</Text>
      <TextInput
        style={styles.input}
        value={ingredientName}
        onChangeText={(val) => {
          const formattedVal = val.charAt(0).toUpperCase() + val.slice(1);
          setIngredientName(formattedVal)
        }}
      ></TextInput>
      <Text style={styles.text}>Ingredients unit of measurement</Text>
      <SelectDropdown
        data={measurementCategories}
        onSelect={(selectedItem, index) => {
          setUnitOfMeasurement(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return `${selectedItem}`;
        }}
        renderDropdownIcon={() => {
          return <FontAwesomeIcon icon={faChevronDown} />;
        }}
        buttonStyle={styles.dropDownStyle}
        buttonTextStyle={styles.dropDownText}
        rowStyle={styles.rowStyle}
      />
      <Text style={styles.text}>Ingredient storage type</Text>
      <SelectDropdown
        data={storageCategories}
        onSelect={(selectedItem, index) => {
            setStorageType(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return `${selectedItem}`;
        }}
        renderDropdownIcon={() => {
          return <FontAwesomeIcon icon={faChevronDown} />;
        }}
        buttonStyle={styles.dropDownStyle}
        buttonTextStyle={styles.dropDownText}
        rowStyle={styles.rowStyle}
      />
      <Pressable
        style={styles.button}
        disabled={ingredientName && unitOfMeasurement && storageType ? false : true}
        onPress={async() => {
          setModalVisible(true)
          const result = await addIngredient(ingredientName, unitOfMeasurement, storageType)
          setApiResult(result)
        }}
      >
        <Text style={styles.text}>Add Ingredient</Text>
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
    text: {
      color: 'white',
      fontSize: 18,
      fontFamily: 'Nunito',
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
    button: {
      backgroundColor: '#6D2D55',
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop:60
    },
    dropDownStyle: {
      width: '60%',
      height: 50,
      margin: 12,
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
      width: "60%",
      height: 50,
      marginLeft:"20%",
      marginTop:60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }
  });

export default AddIngredient;