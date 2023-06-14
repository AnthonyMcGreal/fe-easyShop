import {Modal, View, StyleSheet, Text} from 'react-native'
import Button from '../components/Button'

import {useNavigation} from '@react-navigation/native'
import Spacer from '../components/Spacer'
import PageLoading from '../components/PageLoading'

const DeleteRecipeModal = ({isDeleteLoading,
	isSuccess,
	isModalOpen,
	setIsModalOpen}) => {

    const navigation = useNavigation()
    if (isDeleteLoading) return <PageLoading />

    return (
      <Modal
        visible={isModalOpen}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setIsModalOpen(false)
        }}
      >
        <View style={styles.background}>
          <Text style={styles.text}>Recipe deleted</Text>
          <Spacer spaceRequired={5} />
          <Button
            onPress={() => navigation.navigate('RecipesHome')}
            buttonText={'Back to Recipes'}
          />
        </View>
      </Modal>
    )
  }
  
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      width: '100%'
    },
    text: {
      fontSize: 24,
      fontFamily: 'Nunito'
    }
  })
  
  export default DeleteRecipeModal
  