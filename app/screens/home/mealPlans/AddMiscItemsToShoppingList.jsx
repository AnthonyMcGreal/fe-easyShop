import React, {useEffect, useState} from 'react'
import {Text, StyleSheet, Pressable, Modal, View, FlatList} from 'react-native'
import {getMiscItems} from '../../../api'
import {SafeAreaView} from 'react-native-safe-area-context'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {useUserContext} from '../../../components/UserContext'
import {useAuthContext} from '../../../components/AuthContext'

function AddMiscItemsToShoppingList({navigation, route}) {
	const user = useUserContext()
	const token = useAuthContext()

	const recipes = route.params.recipes

	const [miscItems, setMiscItems] = useState([])
	const [miscItemNames, setMiscItemNames] = useState([])
	const [addedMiscItems, setAddedMiscItems] = useState([])
	const [addModalVisible, setAddModalVisible] = useState(false)
	const [removeModalVisible, setRemoveModalVisible] = useState(false)
	const [selectedMiscItem, setSelectedMiscItem] = useState({})
	const [selectedQuantity, setSelectedQuantity] = useState()

	const quantityAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9]

	useEffect(async () => {
		const miscItems = await getMiscItems(user.user_id, token)
		const miscItemNames = miscItems.data.miscItems.map(item => item.name)
		setMiscItems(miscItems.data.miscItems)
		setMiscItemNames(miscItemNames)
	}, [])

	const handleMiscItemSelection = selectedMiscItem => {
		setSelectedMiscItem(selectedMiscItem)
	}

	const handleQuantitySelection = selectedQuantity => {
		setSelectedQuantity(selectedQuantity)
	}

	const handleAddMiscItemToShoppingList = () => {
		addedMiscItems.push({name: selectedMiscItem, quantity: selectedQuantity})
		setAddModalVisible(false)
	}

	const handleRemoveMiscItemFromShoppingList = () => {
		const newMiscItemList = addedMiscItems.filter(
			item => item.name !== selectedMiscItem
		)
		setAddedMiscItems(newMiscItemList)
		setRemoveModalVisible(false)
	}

	const createShoppingList = () => {
		let miscItems = formatMiscItems()
		let finalList = {recipes: recipes, miscItems: miscItems}
		navigation.navigate('ShoppingList', {
			finalList: finalList
		})
	}

	const formatMiscItems = () => {
		let miscItems = {}
		addedMiscItems.forEach(item => (miscItems[item.name] = item.quantity))
		return miscItems
	}

	return (
		<SafeAreaView style={styles.background}>
			<Text style={styles.title}>Add Misc Items</Text>

			{/* add misc item modal */}

			<Modal
				animationType="fade"
				visible={addModalVisible}
				onRequestClose={() => {
					setAddModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.modelContainer}>
						<Text style={styles.text}>Pick a misc item:</Text>
						<SelectDropdown
							data={miscItemNames}
							onSelect={handleMiscItemSelection}
							buttonTextAfterSelection={selectedMiscItem =>
								`${selectedMiscItem}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<Text style={styles.text}>Select a quantity:</Text>
						<SelectDropdown
							data={quantityAvailable}
							onSelect={handleQuantitySelection}
							buttonTextAfterSelection={selectedQuantity =>
								`${selectedQuantity}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<View>
							<Pressable
								style={styles.button}
								disabled={!selectedMiscItem || !selectedQuantity}
								onPress={handleAddMiscItemToShoppingList}
							>
								<Text style={styles.text}>Add to shopping list</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => setAddModalVisible(false)}
							>
								<Text style={styles.text}>Back</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{/* end of Add Modal */}
			{/* remove misc item modal */}

			<Modal
				animationType="fade"
				visible={removeModalVisible}
				onRequestClose={() => {
					setRemoveModalVisible(false)
				}}
			>
				<View style={styles.background}>
					<View style={styles.modelContainer}>
						<Text style={styles.text}>Pick a misc item to remove:</Text>
						<SelectDropdown
							data={addedMiscItems.map(item => item.name)}
							onSelect={handleMiscItemSelection}
							buttonTextAfterSelection={selectedMiscItem =>
								`${selectedMiscItem}`
							}
							renderDropdownIcon={() => (
								<FontAwesomeIcon icon={faChevronDown} />
							)}
							buttonStyle={styles.addIngredientDropDownStyle}
							buttonTextStyle={styles.dropDownText}
							rowStyle={styles.rowStyle}
						/>
						<View>
							<Pressable
								style={styles.button}
								disabled={!selectedMiscItem}
								onPress={handleRemoveMiscItemFromShoppingList}
							>
								<Text style={styles.text}>Remove misc item</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={() => setRemoveModalVisible(false)}
							>
								<Text style={styles.text}>Back</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

			{/* end of remove misc item modal */}
			{/* baseScreen */}

			<Text></Text>
			<View style={styles.flatListContainer}>
				<FlatList
					style={styles.flatList}
					data={addedMiscItems}
					renderItem={({item}) => (
						<Text style={styles.listText}>
							• {item.name} - {item.quantity}
						</Text>
					)}
					keyExtractor={(item, index) => index.toString()}
				></FlatList>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={styles.roundButton}
					onPress={async () => {
						setAddModalVisible(true)
					}}
				>
					<Text style={styles.roundButtonText}>+</Text>
				</Pressable>
				<Pressable
					style={styles.roundButton}
					disabled={addedMiscItems.length === 0}
					onPress={() => {
						setSelectedMiscItem('')
						setRemoveModalVisible(true)
					}}
				>
					<Text style={styles.roundButtonText}>-</Text>
				</Pressable>
			</View>
			<View>
				<Pressable
					style={styles.button}
					onPress={() => {
						createShoppingList()
					}}
				>
					<Text style={styles.text}>Create shopping list</Text>
				</Pressable>
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
	title: {
		color: 'white',
		fontSize: 30,
		fontFamily: 'Nunito',
		textAlign: 'center',
		marginBottom: 10
	},
	text: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'center'
	},
	flatListContainer: {
		width: '70%',
		height: 280,
		marginBottom: 20
	},
	flatList: {
		backgroundColor: '#2d556d'
	},
	listText: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Nunito',
		textAlign: 'left'
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	roundButton: {
		backgroundColor: '#6D2D55',
		width: 80,
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50
	},
	roundButtonText: {
		color: 'white',
		fontSize: 50,
		fontFamily: 'Nunito',
		marginBottom: 10
	},
	button: {
		backgroundColor: '#6D2D55',
		width: 230,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginTop: 30
	},
	modelContainer: {
		backgroundColor: '#2d556d',
		width: '80%',
		height: 500,
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between'
	},
	addIngredientDropDownStyle: {
		width: 230,
		height: 50,
		borderWidth: 1,
		backgroundColor: 'lightgrey'
	},
	dropDownText: {
		lineHeight: 20,
		fontSize: 16,
		paddingLeft: 10,
		fontFamily: 'Nunito'
	},
	rowStyle: {
		backgroundColor: 'lightgrey'
	}
})

export default AddMiscItemsToShoppingList
