import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const addRecipeToMealPlanSchema = Yup.object().shape({
	selectedRecipe: Yup.string().required('Please select a recipe'),
	selectedPortionSize: Yup.string().required('Please select a portion size'),
	selectedDay: Yup.string().required('Please select a day')
})

const AddRecipeToMealPlanForm = ({recipes, days, portionSizes, onSubmit}) => {
	return (
		<Formik
			initialValues={{
				selectedRecipe: '',
				selectedPortionSize: '',
				selectedDay: ''
			}}
			initialTouched={{
				selectedRecipe: false,
				selectedPortionSize: false,
				selectedDay: false
			}}
			onSubmit={values =>
				onSubmit(
					values.selectedRecipe,
					values.selectedPortionSize,
					values.selectedDay
				)
			}
			validationSchema={addRecipeToMealPlanSchema}
		>
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const isSubmitDisabled =
					values.selectedRecipe === '' ||
					values.selectedPortionSize === '' ||
					values.selectedDay === ''

				const onRecipeSelect = recipe => {
					handleChange('selectedRecipe')(recipe)
				}
				const onPortionSizeSelect = size => {
					handleChange('selectedPortionSize')(size)
				}
				const onDaySelect = day => {
					handleChange('selectedDay')(day)
				}

				return (
					<>
						<Spacer spaceRequired={30} />
						<Text>Pick a recipe</Text>
						<Spacer spaceRequired={3} />
						<DropDownList listData={recipes} onSelect={onRecipeSelect} />
						<Spacer spaceRequired={3} />
						<Text>Pick a portion size</Text>
						<Spacer spaceRequired={3} />
						<DropDownList
							listData={portionSizes}
							onSelect={onPortionSizeSelect}
						/>
						<Spacer spaceRequired={3} />
						<Text>Pick a day</Text>
						<Spacer spaceRequired={3} />
						<DropDownList listData={days} onSelect={onDaySelect} />
						<Spacer spaceRequired={20} />
						<Button
							onPress={handleSubmit}
							buttonText={'Add to meal plan'}
							disabled={isSubmitDisabled}
						/>
					</>
				)
			}}
		</Formik>
	)
}

export default AddRecipeToMealPlanForm
