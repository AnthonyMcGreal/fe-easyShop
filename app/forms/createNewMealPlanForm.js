import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const createNewMealPLanSchema = Yup.object().shape({
	mealPlanName: Yup.string().required('*Meal plan name is required'),
	mealPlanLength: Yup.string().required(
		'*Please select the number of days in the meal plan'
	),
	mealPlanStartDay: Yup.string().required(
		'*Please select a meal plan start date'
	)
})

const MEAL_PLAN_LENGTH_OPTIONS = ['1', '2', '3', '4', '5', '6', '7']

const CreateNewMealPlanForm = ({onSubmit, days}) => {
	return (
		<Formik
			initialValues={{
				mealPlanName: '',
				mealPlanLength: '',
				mealPlanStartDay: ''
			}}
			initialTouched={{
				mealPlanName: false,
				mealPlanLength: false,
				mealPlanStartDay: false
			}}
			onSubmit={values =>
				onSubmit(
					values.mealPlanName,
					values.mealPlanStartDay,
					values.mealPlanLength
				)
			}
			validationSchema={createNewMealPLanSchema}
		>
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const isMealPlanNameError = errors.mealPlanName && touched.mealPlanName
				const isSubmitDisabled =
					isMealPlanNameError ||
					values.mealPlanLength === '' ||
					values.mealPlanStartDay === ''

				const onStartDaySelect = day => {
					handleChange('mealPlanStartDay')(day)
				}

				const onMealPlanLenghtSelect = length => {
					handleChange('mealPlanLength')(length)
				}

				return (
					<>
						<Spacer spaceRequired={30} />
						<Text> Meal plan name</Text>
						<Spacer spaceRequired={3} />
						<TextInput
							accessibilityLabel="meal plan name input"
							onChangeText={val => {
								const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
								handleChange('mealPlanName')(formattedVal)
							}}
							onBlur={() => setFieldTouched('mealPlanName')}
							value={values.mealPlanName}
							style={[
								styles.input,
								isMealPlanNameError ? styles.inputError : null
							]}
						/>
						<Spacer spaceRequired={3} />
						<Text>Meal plan start day</Text>
						<Spacer spaceRequired={3} />
						<DropDownList listData={days} onSelect={onStartDaySelect} />
						<Spacer spaceRequired={3} />
						<Text>Number of days in meal plan</Text>
						<Spacer spaceRequired={3} />
						<DropDownList
							listData={MEAL_PLAN_LENGTH_OPTIONS}
							onSelect={onMealPlanLenghtSelect}
						/>
						<Spacer spaceRequired={20} />
						<Button
							onPress={handleSubmit}
							buttonText={'Add recipes to meal plan'}
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

export default CreateNewMealPlanForm
