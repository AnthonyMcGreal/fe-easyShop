import {useState} from 'react'
import {Formik} from 'formik'
import Spacer from '../components/Spacer'
import Text from '../components/Text'
import * as Yup from 'yup'
import DropDownList from '../components/DropDownList'
import Button from '../components/Button'

const removeRecipeFromMealPlanSchema = Yup.object().shape({
	selectedDay: Yup.string().required('Please select a day'),
	selectedRecipe: Yup.string().required('Please select a recipe')
})

const RemoveRecipeFromMealPlanForm = ({daysWithRecipes, recipes, onSubmit}) => {
	const [recipesForDay, setRecipesForDay] = useState([])
	return (
		<Formik
			initialValues={{selectedDay: '', selectedRecipe: ''}}
			initialTouched={{selectedDay: false, selectedRecipe: false}}
			onSubmit={values => onSubmit(values.selectedDay, values.selectedRecipe)}
			validationSchema={removeRecipeFromMealPlanSchema}
		>
			{({handleChange, handleSubmit, values}) => {
				const isSubmitDisabled =
					values.selectedDay === '' || values.selectedRecipe === ''

				const getRecipesForSelectedDay = day => {
					const result = recipes.filter(recipe => {
						return Object.keys(recipe)[0] === day
					})
					setRecipesForDay(result[0][day].map(recipe => recipe.recipe_name))
				}
				const onDaySelect = day => {
					handleChange('selectedRecipe')('')
					handleChange('selectedDay')(day)
					getRecipesForSelectedDay(day)
				}
				const onRecipeSelect = recipe => {
					handleChange('selectedRecipe')(recipe)
				}
				return (
					<>
						<Spacer spaceRequired={30} />
						<Text>Pick a day</Text>
						<DropDownList listData={daysWithRecipes} onSelect={onDaySelect} />
						<Spacer spaceRequired={3} />
						<Text>Pick a recipe</Text>
						<DropDownList
							listData={recipesForDay}
							onSelect={onRecipeSelect}
							disabled={!values.selectedDay}
						/>
						<Spacer spaceRequired={20} />
						<Button
							onPress={handleSubmit}
							buttonText={'Remove from meal plan'}
							disabled={isSubmitDisabled}
						/>
					</>
				)
			}}
		</Formik>
	)
}

export default RemoveRecipeFromMealPlanForm
