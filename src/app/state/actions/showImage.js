import {
  SET_PLAYER_HEIGHT,
  SHOW_IMAGE
} from '../types'

export const setShowImage = ({ showImage, cardHeight }) => {
  return dispatch => {
    dispatch({ type: SHOW_IMAGE, payload: { showImage, cardHeight } })
  }
}

export const setPlayerHeight = (playerHeight) => {
  return dispatch => {
    dispatch({ type: SET_PLAYER_HEIGHT, payload: playerHeight })
  }
}