import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function DeleteRecipe(props) {
  return (
    <SafeAreaView style={styles.background}>
      <Text>Delete a Recipe Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeleteRecipe;