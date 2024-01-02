import {
  OPEN_PAGE,
} from '../types'

export const togglePage = (type) => {
  return dispatch => {
    dispatch(({ type: OPEN_PAGE, payload: type }))
  }
}