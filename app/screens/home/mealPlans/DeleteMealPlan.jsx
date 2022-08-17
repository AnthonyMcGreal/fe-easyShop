import React from 'react'
import {View, Text, StyleSheet, Button, Pressable} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

function DeleteMealPlans({navigation}) {
	return (
    <SafeAreaView style={styles.background}>
			<View style={styles.contentContainer}>
				<View>
					<Text style={styles.text}>DeleteMealPlan page</Text>
				</View>
      </View>
    </SafeAreaView>
  )
  }

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#2d556d',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    contentContainer: {
      height: '90%',
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
      margin: '10%'
    },
    text: {
      color: 'white',
      fontFamily: 'Nunito',
      fontSize: 16
    }
  })

  export default DeleteMealPlans