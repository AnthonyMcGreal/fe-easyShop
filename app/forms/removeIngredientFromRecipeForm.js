import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const removeIngredientFromRecipeSchema = Yup.object().shape({
	ingredient: Yup.string().required('Please select an ingredient')
})

const RemoveIngredientsFromRecipeForm = ({ingredients, onSubmit}) => {
	return (
		<Formik
			initialValues={{ingredient: ''}}
			initialTouched={{ingredient: false}}
			onSubmit={values => onSubmit(values.ingredient)}
			validationSchema={removeIngredientFromRecipeSchema}
		>
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const isSubmitDisabled = values.ingredient === ''

				const onIngredientSelect = ingredient => {
					handleChange('ingredient')(ingredient)
				}
				return (
					<>
						<Spacer spaceRequired={30} />
						<Text>Pick an ingredient</Text>
						<DropDownList
							listData={ingredients}
							onSelect={onIngredientSelect}
						/>
						<Spacer spaceRequired={20} />
						<Button
							onPress={handleSubmit}
							buttonText={'Remove from recipe'}
							disabled={isSubmitDisabled}
						/>
					</>
				)
			}}
		</Formik>
	)
}

export default RemoveIngredientsFromRecipeForm
