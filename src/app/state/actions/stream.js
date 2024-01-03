import fetchClient from '../../utils/fetchClient'
import {
  ADD_AUDIO_DEVICES,
  ADD_VIDEO_DEVICES,
  ADD_DEVICE_PERMISSIONS,
  TOGGLE_MIKE,
  TOGGLE_CAMERA,
  SET_ACTIVE_VIDEO,
  SET_ACTIVE_AUDIO,
  GET_STREAM_SUCCESS,
  SET_STREAM_LOADING,
  TOGGLE_LIVE,
  GET_STREAM_FAIL,
} from '../types'


export const getStream = () => {
  return async dispatch => {
    try {
      const result = await fetch('/api/getStream')
      const res = await result.json()
      if (res.channelArn) {
        dispatch({ type: GET_STREAM_SUCCESS, payload: res })
      } else {
        throw new Error()
      }
    } catch (err) {
      dispatch({ type: GET_STREAM_FAIL })
    }
  }
}

export const setStreamLoading = (bool = false) => {
  return dispatch => {
    dispatch(({ type: SET_STREAM_LOADING, payload: bool }))
  }
}

export const setMikeOn = (bool) => {
  return dispatch => {
    dispatch(({ type: TOGGLE_MIKE, payload: bool }))
  }
}

export const toggleCamera = (bool) => {
  return dispatch => {
    dispatch(({ type: TOGGLE_CAMERA, payload: bool }))
  }
}

export const addAudioDevices = (audioDevices) => {
  return dispatch => {
    dispatch(({ type: ADD_AUDIO_DEVICES, payload: audioDevices }))
  }
}

export const addVideoDevices = (videoDevices) => {
  return dispatch => {
    dispatch(({ type: ADD_VIDEO_DEVICES, payload: videoDevices }))
  }
}

export const addDevicePermissions = (permissions) => {
  return dispatch => {
    dispatch(({ type: ADD_DEVICE_PERMISSIONS, payload: permissions }))
  }
}

export const setActiveVideoDevice = (device) => {
  return dispatch => {
    dispatch(({ type: SET_ACTIVE_VIDEO, payload: device }))
  }
}

export const setActiveAudioDevice = (device) => {
  return dispatch => {
    dispatch(({ type: SET_ACTIVE_AUDIO, payload: device }))
  }
}
