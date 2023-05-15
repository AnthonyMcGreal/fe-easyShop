import {StyleSheet} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'

const DropDownList = ({listData, onSelect}) => {
	return (
		<SelectDropdown
			data={listData}
			onSelect={selectedItem => {
				onSelect(selectedItem)
			}}
			rowTextForSelection={selectedItem => {
				return `${selectedItem}`
			}}
			buttonTextAfterSelection={selectedItem => {
				return `${selectedItem}`
			}}
			renderDropdownIcon={() => {
				return <FontAwesomeIcon icon={faChevronDown} />
			}}
			buttonStyle={styles.buttonStyle}
			buttonTextStyle={styles.dropDownText}
			rowStyle={styles.rowStyle}
			rowTextStyle={styles.rowTextStyle}
			dropdownStyle={styles.dropdownStyle}
		/>
	)
}

const styles = StyleSheet.create({
	buttonStyle: {
		width: 250,
		height: 50,
		margin: 12,
		borderRadius: 50,
		borderWidth: 3,
		borderColor: '#642CA9',
		backgroundColor: '#F1F2F6'
	},
	dropDownText: {
		lineHeight: 20,
		fontSize: 16,
		paddingLeft: 10,
		fontFamily: 'Nunito'
	},
	rowStyle: {
		backgroundColor: 'white'
	},
	rowTextStyle: {
		fontFamily: 'Nunito'
	},
	dropdownStyle: {
		borderRadius: 25
	}
})

export default DropDownList
