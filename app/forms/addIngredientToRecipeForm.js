import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'
import useGetIngredients from '../hooks/useGetIngredients'
import {useEffect} from 'react'

const addIngredientToRecipeSchema = Yup.object().shape({
	ingredient: Yup.string().required,
	quantity: Yup.string().required
})

const addIngredientsToRecipeForm = ({ingredients, onSubmit}) => {
	return (
		<Formik
			initialValues={{ingredient: '', quantity: ''}}
			initialTouched={{ingredient: false, quantity: false}}
			onSubmit={values => onSubmit(values.ingredient, values.quantity)}
			validationSchema={addIngredientToRecipeSchema}
		>
			{({
				handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
				const isQuantityError = errors.quantity && touched.quantity
				const isSubmitDisabled =
					isQuantityError ||
					!touched.quantity ||
					values.ingredient === '' ||
					values.quantity === ''

         const onIngredientSelect = ingredient => {
          handleChange('ingredient')(ingredient)
         } 
         return (
          <>
            <Spacer spaceRequired={30} />
            <Text>Pick an ingredient</Text>
            <Spacer spaceRequired={3} />
            <DropDownList
							listData={ingredients}
							onSelect={onIngredientSelect}
						/>
            <Spacer spaceRequired={3} />
            <TextInput
							accessibilityLabel="enter quantity input"
							onChangeText={val => {
								const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
								handleChange('quantity')(formattedVal)
							}}
							onBlur={() => setFieldTouched('quantity')}
							value={values.quantity}
							style={[
								styles.input,
								isQuantityError ? styles.inputError : styles.null
							]}
						/>
						<Spacer spaceRequired={20} />
            <Button
							onPress={handleSubmit}
							buttonText={'Add to recipe'}
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

export default addIngredientsToRecipeForm
