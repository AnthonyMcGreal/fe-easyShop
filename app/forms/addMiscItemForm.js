import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const addMiscItemSchema = Yup.object().shape({
	miscItemName: Yup.string().required('*Item name is required'),
	itemCategory: Yup.string().required('*Please choose a category')
})

const categories = [
	'Cleaning',
	'Hygiene',
	'Household Items',
	'Frozen',
	'Chilled',
	'Ambient',
	'Produce',
	'Bread',
	'Other'
]

const AddMiscItemForm = ({onSubmit}) => {
	return (
		<Formik
			initialValues={{miscItemName: '', itemCategory: ''}}
			initialTouched={{miscItemName: false, itemCategory: false}}
			onSubmit={values => onSubmit(values.miscItemName, values.itemCategory)}
			validationSchema={addMiscItemSchema}
		>
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const ismiscItemNameError = errors.miscItemName && touched.miscItemName
				const isSubmitDisabled =
					ismiscItemNameError ||
					!touched.miscItemName ||
					values.itemCategory === ''

				const onDropdownSelect = category => {
					handleChange('itemCategory')(category)
				}
				return (
					<>
						<Spacer spaceRequired={30} />
						<Text>Misc item name</Text>
						<Spacer spaceRequired={3} />
						<TextInput
							accessibilityLabel="misc item name input"
							onChangeText={val => {
								const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
								handleChange('miscItemName')(formattedVal)
							}}
							onBlur={() => setFieldTouched('miscItemName')}
							value={values.miscItemName}
							style={[
								styles.input,
								ismiscItemNameError ? styles.inputError : null
							]}
						/>
						<Spacer spaceRequired={3} />
						<Text>Item category</Text>
						<Spacer spaceRequired={3} />
						<DropDownList listData={categories} onSelect={onDropdownSelect} />
						<Spacer spaceRequired={20} />
						<Button
							onPress={handleSubmit}
							buttonText={'Add misc item'}
							disabled={isSubmitDisabled}
						/>
					</>
				)
			}}
		</Formik>
	)
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: 250,
		borderWidth: 3,
		paddingLeft: 25,
		borderColor: '#642CA9',
		borderRadius: 50,
		backgroundColor: '#F1F2F6',
		fontFamily: 'Nunito',
		color: 'black'
	},
	inputError: {
		borderColor: '#D2042D'
	}
})

export default AddMiscItemForm
