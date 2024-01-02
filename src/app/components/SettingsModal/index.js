import { useEffect, useRef, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import constants from '../../constants'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import { tertiary900 } from '../../styles/colours'
import { Border } from './styled'


const SettingsModal = () => {
  const ingestServerEl = useRef()
  const streamKeyEl = useRef()

  const { setActiveAudioDevice, setActiveVideoDevice, toggleModal, setBroadcastKeys } = useActions()
  const { videoDevices, audioDevices, activeVideoDevice, activeAudioDevice } = useSelector(state => state.stream)
  const { ingestServer, streamKey } = useSelector(state => state.channel)

  const [selectedAudioDevice, setSelectedAudioDevice] = useState(activeAudioDevice.deviceId)
  const [selectedVideoDevice, setSelectedVideoDevice] = useState(activeVideoDevice.deviceId)

  const [ingestServerInput, setIngestServer] = useState()
  const [streamKeyInput, setStreamKey] = useState()

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

  console.log('ingestServerInput', ingestServerInput, streamKeyInput);

  const handleDeviceChange = () => {
    if (ingestServerInput || streamKeyInput) {
      setBroadcastKeys({
        ingestServer: ingestServerInput, streamKey: streamKeyInput
      })
    }
    handleVideoDeviceSelect(selectedVideoDevice)
    handleAudioDeviceSelect(selectedAudioDevice)
    toggleModal()
  }

  useEffect(() => {
    setStreamKey(streamKey)
    setIngestServer(ingestServer)
  }, [])

  const inputStyles = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  }

  return (
    <>
      <Typography key='audio_settings' color='custom.white' sx={{ mb: 4.5 }} variant='h4'>
        {constants.STREAM_SETTINGS}
      </Typography>
      <TextField
        ref={ingestServerEl}
        shrink={false}
        placeholder={'rtmps://xxxxxxxxxxxx.global-contribute.live-video.net:443/app/'}
        label={constants.INGEST_SERVER}
        fullWidth={true}
        sx={{ marginBottom: 3.8 }}
        inputProps={{
          style: inputStyles,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={ingestServerInput}
        onChange={(e) => setIngestServer(e.target.value)}
      />

      <TextField
        ref={streamKeyEl}
        label={constants.STREAM_KEY}
        fullWidth={true}
        placeholder={'sk_us-west-2_xxxxxxxxxxxxxx_xxxxxxxxxxxx'}
        sx={{ marginBottom: 1 }}
        type='password'
        InputLabelProps={{
          shrink: true,
        }}
        value={streamKeyInput}
        onChange={(e) => setStreamKey(e.target.value)}
      />

      <Border />

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