import { useEffect, useState } from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {getMiscItems} from '../api';

const DeleteMiscItem = ({navigation}) => {
 const [miscItems, onChangeMiscItems] = useState('')
 const [itemNames, setItemNames] = useState([]);
 const [itemToDelete, onChangeItemToDelete] = useState('')
 const [modalVisible, setModalVisible] = useState(true)
 const [apiResult, setApiResult] = useState(0)

  useEffect( async () => {
   const items = await getMiscItems()
   onChangeMiscItems(items.data.miscItems)
   setApiResult(items.status)
   if (apiResult === 200) setItemNames(miscItems.map((item) => item.name))
  }, [apiResult]);
  

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
         {apiResult===200? <Text>{setTimeout(()=>{setModalVisible(false)},100)}</Text>:null}
         {apiResult===500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong on our side, try again later</Text>{backButton()}</View>:null}
         {apiResult >0 && apiResult!== 201 && apiResult !==500? <View><Text style={styles.afterActionText}>Ooops! Something went wrong, try again</Text>{backButton()}</View>:null}
         {apiResult === 0? <ActivityIndicator size="large" color='#6D2D55' animating={true}/>: null}
          </View>
        </View>
      </Modal>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>Pick a misc. item to delete</Text>
        <SelectDropdown 
          data={itemNames}
          onSelect={(selectedItem, index) => {
            onChangeItemToDelete(selectedItem);
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
      </View>
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
      height:'90%',
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
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      
});

export default DeleteMiscItem;