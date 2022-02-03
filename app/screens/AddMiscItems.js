import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function AddMiscItems(props) {
  return (
    <SafeAreaView style={styles.background}>
      <Text>Misc Item Page</Text>
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
export default AddMiscItems;
