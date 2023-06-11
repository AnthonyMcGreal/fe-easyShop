import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const addIngredientSchema = Yup.object().shape({
	ingredientName: Yup.string().required('*Ingredient name is required'),
	unitOfMeasurement: Yup.string().required(
		'*Please select a unit of measurement'
	),
	storageType: Yup.string().required('*Please select a storage type')
})

const storageCategories = ['Frozen', 'Chilled', 'Ambient', 'Produce', 'Bread']

const measurementCategories = [
	'individual',
	'tsp',
	'tbsp',
	'fl oz',
	'cup',
	'ml',
	'l',
	'lb',
	'oz',
	'mg',
	'g',
	'kg'
]

const AddIngredientForm = ({onSubmit}) => {
	return (
		<Formik
			initialValues={{
				ingredientName: '',
				unitOfMeasurement: '',
				storageType: ''
			}}
			initialTouched={{
				ingredientName: false,
				unitOfMeasurement: false,
				storagetype: false
			}}
			onSubmit={values =>
				onSubmit(
					values.ingredientName,
					values.unitOfMeasurement,
					values.storageType
				)
			}
			validationSchema={addIngredientSchema}
		>
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const isIngredientNameError =
					errors.ingredientName && touched.ingredientName
				const isSubmitDisabled =
					isIngredientNameError ||
					!touched.ingredientName ||
					values.unitOfMeasurement === '' ||
					values.storageType === ''

				const onUOMSelect = UOM => {
					handleChange('unitOfMeasurement')(UOM)
				}

				const onStorageCategoriesSelect = category => {
					handleChange('storageType')(category)
				}
				return (
					<>
						<Spacer spaceRequired={30} />
						<Text>Ingredient Name</Text>
						<Spacer spaceRequired={2} />
						<TextInput
							accessibilityLabel="ingredient name input"
							onChangeText={val => {
								const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
								handleChange('ingredientName')(formattedVal)
							}}
							onBlur={() => setFieldTouched('ingredientName')}
							value={values.ingredientName}
							style={[
								styles.input,
								isIngredientNameError ? styles.inputError : styles.null
							]}
						/>
						<Spacer spaceRequired={3} />
						<Text>Ingredients unit of measurement</Text>
						<DropDownList
							listData={measurementCategories}
							onSelect={onUOMSelect}
						/>
						<Spacer spaceRequired={3} />
						<Text>Ingredient storage type</Text>
						<DropDownList
							listData={storageCategories}
							onSelect={onStorageCategoriesSelect}
						/>
						<Spacer spaceRequired={20} />

						<Button
							onPress={handleSubmit}
							buttonText={'Add Ingredient'}
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

export default AddIngredientForm
