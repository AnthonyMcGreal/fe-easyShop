import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MiscItems({ navigation }) {
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
            navigation.navigate('AddMiscItems');
          }}
        >
          <Text style={styles.text}>Add a misc. Item</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => {navigation.navigate('DeleteMiscItems');}}>
          <Text style={styles.text}>Delete a misc. Item</Text>
        </Pressable>
      </View>
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
    height: '45%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:'10%'
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
export default MiscItems;
