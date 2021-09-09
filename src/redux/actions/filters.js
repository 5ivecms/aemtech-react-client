import * as types from '../actionsTypes/filters'

export const setSort = (sort) => ({
  type: types.SET_SORT,
  payload: sort,
})

export const setSearchQuery = (query) => ({
  type: types.SET_SEARCH_QUERY,
  payload: query,
})

export const setPublish = (value) => ({
  type: types.SET_PUBLISH,
  payload: value,
})
