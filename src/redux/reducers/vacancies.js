import * as types from '../actionsTypes/vacancies'

const initialState = {
  single: {},
  items: [],
  page: 1,
  perPage: 10,
  total: 0,
}

const vacancies = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VACANCIES:
      return {
        ...state,
        items: action.payload.items,
        page: action.payload.page,
        perPage: action.payload.perPage,
        total: action.payload.total,
      }
    case types.DELETE_VACANCY:
      return {
        ...state,
      }
    case types.CREATE_VACANCY:
      return {
        ...state,
      }
    case types.SET_SINGLE_VACANCY:
      return {
        ...state,
        single: action.payload,
      }

    case types.CLEAR_SINGLE_VACANCY:
      return {
        ...state,
        single: {},
      }
    case types.UPDATE_VACANCY:
      return {
        ...state,
      }
    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      }
    default:
      return state
  }
}

export default vacancies
