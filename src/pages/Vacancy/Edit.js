import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import VacancyForm from '../../components/Vacancy/Form'
import {
  clearSingleVacancy,
  getSingleVacancy,
  updateVacancy,
} from '../../redux/actions/vacancies'

const VacancyEdit = () => {
  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const vacancy = useSelector(({ vacancies }) => vacancies.single)

  const onSubmit = (values) => {
    dispatch(updateVacancy(id, values))
    history.push('/')
  }

  useEffect(() => {
    dispatch(getSingleVacancy(id))
    return () => {
      dispatch(clearSingleVacancy())
    }
  }, [dispatch, id])

  return (
    <>
      <h1>Редактировать вакансию</h1>
      {vacancy.id && <VacancyForm onSubmit={onSubmit} {...vacancy} />}
    </>
  )
}

export default VacancyEdit
