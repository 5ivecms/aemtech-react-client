import axios from 'axios'
import * as types from '../actionsTypes/vacancies'

export const setVacancies = (items) => ({
  type: types.SET_VACANCIES,
  payload: items,
})

export const vacancyDeleted = (id) => ({
  type: types.DELETE_VACANCY,
  payload: id,
})

export const vacancyCreated = (vacancy) => ({
  type: types.CREATE_VACANCY,
  payload: vacancy,
})

export const vacancyUpdated = (vacancy) => ({
  type: types.UPDATE_VACANCY,
  payload: vacancy,
})

export const setSingleVacancy = (item) => ({
  type: types.SET_SINGLE_VACANCY,
  payload: item,
})

export const clearSingleVacancy = () => ({
  type: types.CLEAR_SINGLE_VACANCY,
})

export const setCurrentPage = (page) => ({
  type: types.SET_CURRENT_PAGE,
  payload: page,
})

export const fetchVacancies =
  (sort = 'asc', search = '', isPublish = '', page = 1) =>
  (dispatch) => {
    isPublish = isPublish === 0 || isPublish === 1 ? isPublish : ''
    axios
      .get(
        `https://delta-nkz.ru/rest/vacancy?page=${page}&sort=${sort}&search=${search}&isPublish=${isPublish}`
      )
      .then(({ data }) => {
        dispatch(setVacancies(data))
      })
      .catch((error) => console.log(error))
  }

export const deleteVacancy = (id) => (dispatch) => {
  axios
    .delete(`https://delta-nkz.ru/rest/vacancy/${id}`)
    .then(() => {
      dispatch(vacancyDeleted(id))
      dispatch(fetchVacancies())
    })
    .catch((error) => console.log(error))
}

export const createVacancy = (vacancy) => (dispatch) => {
  axios
    .post(`https://delta-nkz.ru/rest/vacancy/`, vacancy)
    .then(({ data }) => {
      dispatch(vacancyCreated(data))
      dispatch(fetchVacancies())
    })
    .catch((error) => console.log(error))
}

export const updateVacancy = (id, vacancy) => (dispatch) => {
  axios
    .put(`https://delta-nkz.ru/rest/vacancy/${id}`, vacancy)
    .then(({ data }) => {
      dispatch(vacancyUpdated(data))
    })
    .catch((error) => console.log(error))
}

export const getSingleVacancy = (id) => (dispatch) => {
  axios
    .get(`https://delta-nkz.ru/rest/vacancy/${id}`)
    .then(({ data }) => {
      dispatch(setSingleVacancy(data))
    })
    .catch((error) => console.log(error))
}
