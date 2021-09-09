import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {
  clearSingleVacancy,
  getSingleVacancy,
} from '../../redux/actions/vacancies'

const VacancyView = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const vacancy = useSelector(({ vacancies }) => vacancies.single)

  useEffect(() => {
    dispatch(getSingleVacancy(id))
    return () => {
      dispatch(clearSingleVacancy())
    }
  }, [dispatch, id])

  return (
    <>
      <h1>{vacancy.title}</h1>
      <p>{vacancy.text}</p>
    </>
  )
}

export default VacancyView
