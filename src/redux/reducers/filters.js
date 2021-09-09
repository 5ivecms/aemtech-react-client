import * as types from '../actionsTypes/filters'

const initialState = {
  sort: 'asc',
  search: '',
  isPublish: 'all',
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case types.SET_SEARCH_QUERY:
      return {
        ...state,
        search: action.payload,
      }
    case types.SET_PUBLISH:
      return {
        ...state,
        isPublish: action.payload,
      }
    default:
      return state
  }
}

export default filters
