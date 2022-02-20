import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TextInput } from 'react-native-gesture-handler';

function LogIn({ navigation }) {
  const [emailAddress, changeEmailAddress] = React.useState('');
  const [password, changePassword] = React.useState('');

  let disableLogIn = true;

  if (emailAddress && password) {
    disableLogIn = false;
  }

  let [fontsLoaded] = useFonts({
    Nunito: require('../assets/fonts/Nunito-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.background}>
        <View>
          <Text style={styles.name}>EasyShop</Text>
        </View>
        <View style={styles.inputView}>
          <Text> Email Address </Text>
          <TextInput
            style={styles.input}
            onChangeText={changeEmailAddress}
            value={emailAddress}
          />
          <Text> Password </Text>
          <TextInput
            style={styles.input}
            onChangeText={changePassword}
            value={password}
            secureTextEntry={true}
          />
          <Button
            color="#6D2D55"
            disabled={disableLogIn}
            style
            title="Log In"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2d556d',
    width: '100%',
    alignItems: 'center',
  },
  name: {
    top: '50%',
    color: '#6D2D55',
    fontSize: 50,
    fontFamily: 'Nunito',
    textShadowColor: 'white',
    textShadowRadius: 12,
    width: '100%',
  },
  inputView: {
    top: 100,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '70%',
    backgroundColor: 'white',
    fontFamily: 'Nunito',
  },
});

export default LogIn;
