import {useState} from 'react';
import { Text, StyleSheet, Pressable, Modal, View, ActivityIndicator,FlatList  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddIngredientToRecipe = ({navigation}) => {

    const [ingredients, setIngredients] = useState([]);

    let renderedList = ingredients.map((ingredient) => {
        return 
    })

    return (
        <SafeAreaView style={styles.background}>
            <FlatList
                data={ingredients}
                renderItem={renderedList}>

            </FlatList>
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
})

export default AddIngredientToRecipe;