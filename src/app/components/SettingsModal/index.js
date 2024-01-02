import { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import constants from '../../constants'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import { tertiary900 } from '../../styles/colours'


const SettingsModal = () => {
  const { setActiveAudioDevice, setActiveVideoDevice, toggleModal } = useActions()
  const { videoDevices, audioDevices, activeVideoDevice, activeAudioDevice } = useSelector(state => state.stream)

  const [selectedAudioDevice, setSelectedAudioDevice] = useState(activeAudioDevice.deviceId)
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(activeVideoDevice.deviceId)

  const handleVideoDeviceSelect = (deviceId) => {
    const selectedDevice = videoDevices.find(
      (device) => device.deviceId === deviceId
    )
    setActiveVideoDevice(selectedDevice)
    // renderActiveVideoDevice(selectedDevice)
  }

  const handleAudioDeviceSelect = (deviceId) => {
    const selectedDevice = audioDevices.find(
      (device) => device.deviceId === deviceId
    )
    setActiveAudioDevice(selectedDevice)
    // renderActiveAudioDevice(selectedDevice)
  }

  const handleDeviceChange = () => {
    handleVideoDeviceSelect(selectedVideoDevice)
    handleAudioDeviceSelect(selectedAudioDevice)
    toggleModal()
  }

  return (
    <>
      <Typography key='audio_settings' color='custom.white' sx={{ mb: 4.5 }} variant='h4'>{constants.AUDIO_SETTINGS}</Typography>

      <FormControl key='mike' fullWidth sx={{ marginBottom: 3.5 }}>
        <InputLabel sx={{ borderRight: `4px solid ${tertiary900}`, backgroundColor: tertiary900 }}>{constants.MICROPHONE}&nbsp;</InputLabel>
        <Select
          defaultValue={activeAudioDevice.deviceId}
          value={selectedAudioDevice}
          label='Age'
          sx={{ color: 'white' }}
          onChange={(e) => setSelectedAudioDevice(e.target.value)}
        >
          {audioDevices.map(device =>
            <MenuItem key={device.deviceId} value={device.deviceId}>{device.label}</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl key='camera' fullWidth>
        <InputLabel sx={{ borderRight: `4px solid ${tertiary900}`, backgroundColor: tertiary900 }}>{constants.CAMERA}&nbsp;</InputLabel>
        <Select
          defaultValue={activeVideoDevice.deviceId}
          value={selectedVideoDevice}
          label='Age'
          sx={{ color: 'white' }}
          onChange={(e) => setSelectedVideoDevice(e.target.value)}
        >
          {videoDevices.map(device =>
            <MenuItem key={device.deviceId} value={device.deviceId}>{device.label}</MenuItem>
          )}
        </Select>
      </FormControl>
      <Button onClick={handleDeviceChange} variant='contained' fullWidth sx={{ mt: 4.25 }}>{constants.DONE}</Button>
    </>
  )
}

export default SettingsModal