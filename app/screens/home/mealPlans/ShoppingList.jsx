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
import {useAuthContext} from '../../../components/AuthContext'
import {ShoppingListItem} from '../../../components/shoppingListItem'
import {useUserContext} from '../../../components/UserContext'

const ShoppingList = ({navigation, route}) => {
	const user = useUserContext()
	const token = useAuthContext()

	const recipes = route.params.finalList

	const [shoppingList, setShoppingList] = useState({})
	const [categories, setCategories] = useState([])

	useEffect(async () => {
		const shoppingList = await getShoppingList(recipes, user.user_id, token)
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
									<ShoppingListItem shoppingListItem={item} />
								)}
								keyExtractor={(item, index) => index.toString()}
							></FlatList>
						</View>
					)}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
			</View>
			<Pressable
				style={styles.button}
				onPress={() => {
					navigation.navigate('Home')
				}}
			>
				<Text style={styles.text}>Back home</Text>
			</Pressable>
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
		marginTop: 20,
		marginBottom: 20
	},
	flatListContainer: {
		width: '85%',
		height: 460
	},
	flatList: {
		backgroundColor: '#2d556d'
	},
	subTitle: {
		color: 'white',
		fontSize: 22,
		fontFamily: 'Nunito',
		textAlign: 'left',
		textDecorationLine: 'underline',
		marginBottom: 5,
		marginTop: 5
	},
	button: {
		backgroundColor: '#6D2D55',
		width: 250,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito'
	},
})

export default ShoppingList
