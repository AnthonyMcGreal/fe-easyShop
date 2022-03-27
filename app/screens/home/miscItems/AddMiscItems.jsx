import { useState } from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { addMiscItem } from '../../../api';

const AddMiscItems = ({ navigation }) => {
  const [itemName, onChangeItemName] = useState('');
  const [itemCategory, onChangeItemCategory] = useState('');
  const categories = ['Cleaning', 'Hygiene', 'Household Items', 'Other'];
  const [modalVisible, setModalVisible] = useState(false);
  const [apiResult, setApiResult] = useState(0)

  const backButton = () => {
    return (
      <Pressable 
        style={styles.button} 
        onPress={() => {
        navigation.navigate('MiscItems');
        }}>
        <Text style={styles.text}>Back to Misc Items</Text>
      </Pressable>
      )}

  return (
    <SafeAreaView style={styles.background}>
      <Modal
      animationType="fade"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      >
        <View style={styles.background}>
          <View style={styles.modelContainer}>
         {apiResult===201? <View><Text style={styles.afterActionText}>Item Added</Text>{backButton()}</View>:null}
         {apiResult===500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong on our side, try again later</Text>{backButton()}</View>:null}
         {apiResult >0 && apiResult!== 201 && apiResult !==500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong, try again</Text>{backButton()}</View>:null}
         {apiResult === 0? <ActivityIndicator size="large" color='#6D2D55' animating={true}/>: null}
          </View>
        </View>
      </Modal>


      <Text style={styles.text}>Misc item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={(val) => {
          const formattedVal = val.charAt(0).toUpperCase() + val.slice(1);
          onChangeItemName(formattedVal)
        }}
      ></TextInput>
      <Text style={styles.text}>Item Category</Text>
      <SelectDropdown
        data={categories}
        onSelect={(selectedItem, index) => {
          onChangeItemCategory(selectedItem);
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
        disabled={itemName && itemCategory ? false : true}
        onPress={async() => {
          setModalVisible(!modalVisible)
          const result = await addMiscItem(itemName, itemCategory);
          setApiResult(result)
        }}
      >
        <Text style={styles.text}>Add Misc Item</Text>
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
  }
});

export default AddMiscItems;
