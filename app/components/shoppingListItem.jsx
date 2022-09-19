import {useState} from 'react'
import {
	View,
	Text,
	StyleSheet,
} from 'react-native'

function ShoppingListItem ({shoppingListItem}) {

  const [pressed, setPressed] = useState(false)

  const handlePress = () => {
    setPressed(!pressed)
  }

  return (
    <View>
      <Text onPress={handlePress} style={pressed? styles.pressedListText : styles.listText} >
      • {shoppingListItem.name} - {shoppingListItem.quantity} {shoppingListItem.unit_of_measurement}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listText: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'left'
	},
	pressedListText: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'left',
		textDecorationLine:'line-through'
	}
})

export {ShoppingListItem};