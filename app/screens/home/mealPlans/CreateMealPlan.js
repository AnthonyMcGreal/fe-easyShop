import ScreenBase from '../../../components/ScreenBase'
import CreateNewMealPlanForm from '../../../forms/createNewMealPlanForm'

const DAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
]

const CreateNewMealPlan = ({navigation}) => {
	const handleCreateNewMealPLan = (
		mealPlanName,
		mealPlanStartDay,
		mealPlanLength
	) => {
		const startingDayIndex = DAYS.indexOf(mealPlanStartDay)
		const daysList = []
		for (
			let i = +startingDayIndex;
			i < +startingDayIndex + +mealPlanLength;
			i++
		) {
			if (i > 6) {
				daysList.push(DAYS[i - 7])
			} else {
				daysList.push(DAYS[i])
			}
		}

		navigation.navigate('AddRecipeToMealPlan', {
			mealPlanName: mealPlanName,
			mealPlanLength: mealPlanLength,
			mealPlanDays: daysList,
			mealPlan: {},
			route: 'CreateMealPlan'
		})
	}

	return (
		<ScreenBase>
			<CreateNewMealPlanForm days={DAYS} onSubmit={handleCreateNewMealPLan} />
		</ScreenBase>
	)
}

export default CreateNewMealPlan
