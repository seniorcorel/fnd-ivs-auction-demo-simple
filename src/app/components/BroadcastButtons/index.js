import { ButtonsWrapper, BroadcastButton, BroadCastButtonLast } from './styled'
import { MicOffRounded, MicRounded, Settings, Videocam, VideocamOff } from '@mui/icons-material'
import useActions from '../../hooks/useActions'
import constants from '../../constants'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import Tooltip from '../Tooltip'

const BroadcastButtons = ({ handleCameraMute, handleMicMute, handleStream }) => {
  const { toggleModal } = useActions()
  const { mikeOn, cameraOn, isLive, devicePermissions, streamLoading, videoDevices, audioDevices, isLiveBroadcast } = useSelector(state => state.stream)

  const bothPermissions = devicePermissions.video && devicePermissions.audio
  const { MUTE, UNMUTE, HIDE_CAMERA, SHOW_CAMERA, SETTINGS, MICROPHONE_UNAVAILABLE, CAMERA_UNAVAILABLE, ALREADY_LIVE } = constants.TOOLTIPS

  const isNotBroadcast = isLive && !isLiveBroadcast
  const audioIsDisabled = !devicePermissions.audio || !audioDevices.length
  const videoIsDisabled = !devicePermissions.video || !videoDevices.length
  const goLiveIsDisabled = !bothPermissions

  return (
    <ButtonsWrapper>
      <Tooltip text={(devicePermissions.audio && audioDevices.length) ? (mikeOn ? UNMUTE : MUTE) : MICROPHONE_UNAVAILABLE}>
        <span>
          <BroadcastButton
            disabled={audioIsDisabled}
            className={`${!audioIsDisabled && !mikeOn && 'off'} ${audioIsDisabled && 'disabled'}`}
            onClick={() => devicePermissions.audio ? handleMicMute() : {}}
          >
            {mikeOn ? <MicRounded sx={{ width: 18, height: 18 }} /> : <MicOffRounded sx={{ width: 18, height: 18 }} />}
          </BroadcastButton>
        </span>
      </Tooltip>
      <Tooltip text={(devicePermissions.video && videoDevices.length) ? (cameraOn ? SHOW_CAMERA : HIDE_CAMERA) : CAMERA_UNAVAILABLE}>
        <span>
          <BroadcastButton
            disabled={videoIsDisabled}
            className={`${!videoIsDisabled && !cameraOn && 'off'} ${videoIsDisabled && 'disabled'}`}
            onClick={() => devicePermissions.video ? handleCameraMute() : {}}
          >
            {cameraOn ? <Videocam sx={{ width: 18, height: 18 }} /> : <VideocamOff sx={{ width: 18, height: 18 }} />}
          </BroadcastButton>
        </span>
      </Tooltip>
      <Tooltip text={SETTINGS}>
        <span>
          <BroadcastButton
            onClick={() => bothPermissions ? toggleModal(constants.MODAL_TYPE.SETTINGS) : {}}
            disabled={!bothPermissions}
            className={(!bothPermissions) && 'disabled'}
          >
            <Settings sx={{ width: 18, height: 18 }} />
          </BroadcastButton>
        </span>
      </Tooltip>
      <Tooltip text={isNotBroadcast && ALREADY_LIVE}>
        <span>
          <BroadCastButtonLast
            className={`${!goLiveIsDisabled && isLive && 'on'} ${goLiveIsDisabled && 'disabled'}`}
            onClick={() => bothPermissions ? handleStream() : {}}
            disabled={goLiveIsDisabled}
          >
            {streamLoading ? (
              <CircularProgress sx={{ color: 'custom.lightGrey', width: '1.5rem !important', height: '1.5rem !important' }} />
            ) : isLive ? constants.STOP : constants.GO_LIVE}
          </BroadCastButtonLast>
        </span>
      </Tooltip>
    </ButtonsWrapper >
  )
}

export default BroadcastButtons