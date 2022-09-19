import {useEffect, useState} from 'react'
import {
	View,
	Text,
	StyleSheet,
	Modal,
	Pressable,
	ActivityIndicator
} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getShoppingList} from '../../../api'
import { ShoppingListItem } from '../../../components/shoppingListItem'

const ShoppingList = ({navigation, route}) => {
	const recipes = route.params.finalList

	const [shoppingList, setShoppingList] = useState({})
	const [categories, setCategories] = useState([])

	useEffect(async () => {
		const shoppingList = await getShoppingList(recipes)
		setShoppingList(shoppingList)
		setCategories(Object.entries(shoppingList).map(category => category[0]))
	}, [])

	return (
		<SafeAreaView style={styles.background}>
			<Modal
				animationType="fade"
				visible={Object.entries(shoppingList).length === 0}
				onRequestClose={() => {}}
			>
				<View style={styles.background}>
					<ActivityIndicator size="large" color="#6D2D55" animating={true} />
				</View>
			</Modal>
			<Text style={styles.title}>Shopping List</Text>
			<View style={styles.flatListContainer}>
				<FlatList
					style={styles.flatList}
					data={categories}
					renderItem={({item}) => (
						<View>
							<Text style={styles.subTitle} key={item}>
								{item}
							</Text>
							<FlatList
								style={styles.flatList}
								data={shoppingList[item]}
								renderItem={({item}) => (
										<ShoppingListItem shoppingListItem = {item} />
								)}
								keyExtractor={(item, index) => index.toString()}
							></FlatList>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	background: {
		alignItems: 'center',
		backgroundColor: '#2d556d',
		width: '100%',
		height: '100%'
	},
	title: {
		color: 'white',
		fontSize: 30,
		fontFamily: 'Nunito',
		textAlign: 'center',
		marginTop:20,
		marginBottom:20
	},
	flatListContainer: {
		width: '85%',
		height: 460,
	},
	flatList: {
		backgroundColor: '#2d556d'
	},
	subTitle: {
		color: 'white',
		fontSize: 22,
		fontFamily: 'Nunito',
		textAlign: 'left',
		textDecorationLine: 'underline'
	}
})

export default ShoppingList
