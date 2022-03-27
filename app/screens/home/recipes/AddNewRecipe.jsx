import {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function AddNewRecipe(props) {

  const [recipeName, setRecipeName] = useState('')
  const [recipeLink, setRecipeLink] = useState('')
  const [recipePortionSize, setRecipePortionSize] = useState('')
  const portionSizeOptions = [1,2,3,4,5,6,7,8,9,10]

  const handleNameChange = (val) => {
    const formattedVal = val.charAt(0).toUpperCase() + val.slice(1);
    setRecipeName(formattedVal)
  }

  const handleLinkChange = (val) => {
    setRecipeLink(val)
  }

  const handlePortionSizeChange = (val) => {
    setRecipePortionSize(val)
  }

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.text}>Recipe name</Text>
      <TextInput
        style={styles.input}
        value={recipeName}
        onChangeText={handleNameChange}
      />
      <Text style={styles.text}>Link to recipe</Text>
      <TextInput
        style={styles.input}
        value={recipeLink}
        onChangeText={handleLinkChange}
      />
      <Text style={styles.text}>Portion size</Text>
      <SelectDropdown
        data={portionSizeOptions}
        onSelect={handlePortionSizeChange}
        buttonTextAfterSelection={() => recipePortionSize}
        renderDropdownIcon={() => <FontAwesomeIcon icon={faChevronDown} />}
        buttonStyle={styles.dropDownStyle}
        buttonTextStyle={styles.dropDownText}
        rowStyle={styles.rowStyle}
      />
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
});

export default AddNewRecipe;