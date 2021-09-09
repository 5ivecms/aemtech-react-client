import VacancyForm from '../../components/Vacancy/Form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { createVacancy } from '../../redux/actions/vacancies'

function VacancyCreate() {
  const dispatch = useDispatch()
  const history = useHistory()

  const onSubmit = (values) => {
    dispatch(createVacancy(values))
    history.push('/')
  }

  return (
    <>
      <h1>Добавить вакансию</h1>
      <VacancyForm onSubmit={onSubmit} />
    </>
  )
}

export default VacancyCreate
