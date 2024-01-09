import {
  ADD_VIDEO_DEVICES,
  ADD_AUDIO_DEVICES,
  ADD_DEVICE_PERMISSIONS,
  TOGGLE_LIVE,
  TOGGLE_MIKE,
  TOGGLE_CAMERA,
  SET_ACTIVE_VIDEO,
  SET_ACTIVE_AUDIO,
  GET_STREAM_SUCCESS,
  SET_STREAM_LOADING,
  GET_STREAM_FAIL,
} from '../types'

const initialState = {
  mikeOn: false,
  cameraOn: false,
  isLive: false,
  videoDevices: [],
  audioDevices: [],
  devicePermissions: {
    video: false,
    audio: false
  },
  playbackUrl: null,
  streamLoading: false,
  activeVideoDevice: null,
  activeAudioDevice: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIVE:
      return {
        ...state,
        isLive: action.payload.bool,
      }
    case TOGGLE_MIKE:
      return {
        ...state,
        mikeOn: action.payload
      }
    case TOGGLE_CAMERA:
      return {
        ...state,
        cameraOn: action.payload
      }
    case ADD_VIDEO_DEVICES:
      return {
        ...state,
        videoDevices: action.payload
      }
    case ADD_AUDIO_DEVICES:
      return {
        ...state,
        audioDevices: action.payload
      }
    case ADD_DEVICE_PERMISSIONS:
      return {
        ...state,
        devicePermissions: action.payload
      }
    case SET_ACTIVE_VIDEO:
      return {
        ...state,
        activeVideoDevice: action.payload
      }
    case SET_ACTIVE_AUDIO:
      return {
        ...state,
        activeAudioDevice: action.payload
      }
    case GET_STREAM_SUCCESS:
      const stream = action.payload
      return {
        ...state,
        isLive: true,
        playbackUrl: stream.playbackUrl,
        streamLoading: false,
      }
    case GET_STREAM_FAIL:
      const isStopStream = state.playbackUrl
      return {
        ...state,
        playbackUrl: null,
        isLive: false,
        streamLoading: isStopStream ? false : state.streamLoading,
      }
    case SET_STREAM_LOADING:
      return {
        ...state,
        streamLoading: action.payload
      }
    default:
      return state
  }
}

export default reducer