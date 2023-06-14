import {Formik} from 'formik'
import {StyleSheet, TextInput} from 'react-native'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const addNewRecipeSchema = Yup.object().shape({
  recipeName: Yup.string().required('*Recipe name is required'),
  recipeLink: Yup.string(),
  recipePortionSize: Yup.string().required('*Please select the portion size')
})

const allowedPortionSizes = [
  '1','2','3','4','5','6','7','8'
]

const AddNewRecipeForm = ({onSubmit}) => {
  return (
    <Formik
    initialValues={{recipeName: '', recipeLink: '', recipePortionSize: ''}}
    initialTouched={{recipeName: false, recipeLink: false, recipePortionSize: false}}
    onSubmit={values => onSubmit(values.recipeName, values.recipeLink, values.recipePortionSize)}
    validationSchema={addNewRecipeSchema}
    >
      {({
        handleChange,
				handleSubmit,
				values,
				errors,
				touched,
				setFieldTouched
			}) => {
        const isRecipeNameError = errors.recipeName && touched.recipeName
				const isRecipeLinkError = errors.recipeLink && touched.recipeLink
        const isSubmitDisabled = isRecipeNameError || !touched.recipeName || isRecipeLinkError || values.recipePortionSize === ''

        const onPortionSizeSelect = portionSize => {
          handleChange('recipePortionSize')(portionSize)
        }
        return (
          <>
          <Spacer spaceRequired={30} />
          <Text>Recipe name</Text>
          <Spacer spaceRequired={3} />
          <TextInput accessibilityLabel="recipe name input"
							onChangeText={val => {
								const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
								handleChange('recipeName')(formattedVal)
							}}
							onBlur={() => setFieldTouched('recipeName')}
							value={values.recipeName}
							style={[
								styles.input,
								isRecipeNameError ? styles.inputError : null
							]}
              />
              <Spacer spaceRequired={3} />
              <Text>Link to recipe</Text>
              <Spacer spaceRequired={3} />
            <TextInput accessibilityLabel="link to recipe input"
							onChangeText={val => {
								const formattedVal = val.charAt(0).toUpperCase() + val.slice(1)
								handleChange('recipeLink')(formattedVal)
							}}
							onBlur={() => setFieldTouched('recipeLink')}
							value={values.recipeLink}
							style={[
								styles.input,
								isRecipeLinkError ? styles.inputError : null
							]}
              />
              <Spacer spaceRequired={3} />
						<Text>Portion size</Text>
						<Spacer spaceRequired={3} />
						<DropDownList listData={allowedPortionSizes} onSelect={onPortionSizeSelect} />
            <Spacer spaceRequired={20} />
						<Button
							onPress={handleSubmit}
							buttonText={'Add ingredients to recipe'}
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

export default AddNewRecipeForm