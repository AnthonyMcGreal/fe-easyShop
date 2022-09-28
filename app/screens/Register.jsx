import {useState, useContext} from 'react'
import {Text, View, StyleSheet, Button, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

function Register({navigation}) {

  return (
    <SafeAreaView style={styles.background}>
      <View>
					<Text style={styles.name}>Register</Text>
				</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
		flex: 1,
		backgroundColor: '#2d556d',
		width: '100%',
		alignItems: 'center'
	},
  name: {
		top: '50%',
		color: '#6D2D55',
		fontSize: 50,
		fontFamily: 'Nunito',
		textShadowColor: 'white',
		textShadowRadius: 20,
		width: '100%'
	},
})

export default Register