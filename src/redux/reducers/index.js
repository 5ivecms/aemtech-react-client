import { combineReducers } from 'redux'
import filtersReducer from './filters'
import vacanciesReducer from './vacancies'

const rootReducer = combineReducers({
  filters: filtersReducer,
  vacancies: vacanciesReducer,
})

export default rootReducer
