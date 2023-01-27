import {View ,StyleSheet} from 'react-native'


const Spacer = ({size = 's'}) => {
  return (
    <View style={[styles.spacer,styles[size]]}/>
  )
}

const styles = StyleSheet.create({
  spacer:{
    width:'100%'
  },
  s:{
    height:5
  },
  m:{
    height:10
  },
  l:{
    height:15
  },
  xl:{
    height:20
  },
  xxl:{
    height:25
  },
  xxxl:{
    height:30
  }
})

export default Spacer;