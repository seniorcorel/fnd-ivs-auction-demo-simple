"use client"
import { useEffect, useRef, useState } from "react"
import Script from "next/script";
import { CanvasWrapper, VideoWrapper } from "../VideoPlayer/styled";
import useActions from "@/app/hooks/useActions";
import { useSelector } from "react-redux";
import constants from "@/app/constants";
import useMixer from "@/app/utils/useMixer";
import useStream from "@/app/utils/useStream";
import useLayers from "@/app/utils/useLayers";
import EmptyVideo from "../VideoPlayer/EmptyVideo";
import BroadcastButtons from "../BroadcastButtons";
import { getConfigFromResolution } from "@/app/utils/broadcast";

export default function Broadcast() {
  const {
    openNotification,
    setMikeOn,
    toggleCamera,
    addAudioDevices,
    addVideoDevices,
    addDevicePermissions,
    setActiveAudioDevice,
    setActiveVideoDevice
  } = useActions()

  const { cameraOn, mikeOn, devicePermissions, activeVideoDevice, activeAudioDevice, isLive } = useSelector(state => state.stream)
  const { streamKey, ingestServer } = useSelector(state => state.channel)
  const client = useRef(null)
  const canvasRef = useRef(null)
  const { LAYER_NAME } = constants
  const { startStream, stopStream } = useStream()
  const { addLayer, removeLayer } = useLayers([])

  const { addMixerDevice, isMixerDeviceMuted } = useMixer([])

  useEffect(() => {

  }, [activeAudioDevice, activeVideoDevice])

  const getCamOffLayer = (canvas) => {
    return {
      name: 'camOff',
      imageSrc: '/cam-off.png',
      index: 1,
      x: canvas.width / 2 - canvas.width / 16,
      y: canvas.height / 2 - canvas.width / 16,
      width: canvas.width / 8,
      height: canvas.width / 8,
      type: 'IMAGE',
    }
  }

  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput'
      )
      if (!videoDevices.length) {
        openNotification(constants.NOTIFICATION_MESSAGES.NO_VIDEO)
      }
      return videoDevices
    } catch (err) {
      openNotification(err.message)
    }
  }

  const getAudioDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      const audioDevices = devices.filter(
        (device) => device.kind === 'audioinput'
      )
      if (!audioDevices.length) {
        openNotification(constants.NOTIFICATION_MESSAGES.NO_AUDIO)
      }
      return audioDevices
    } catch (err) {
      openNotification(err.message)
    }
  }

  // Handle active video device (webcam) changes...
  const renderActiveVideoDevice = async (selectedVideoDevice) => {
    const canvas = client.current.getCanvasDimensions()

    let layer = {
      device: selectedVideoDevice,
      name: LAYER_NAME.CAM,
      index: 4,
      visible: !cameraOn,
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
      type: 'VIDEO',
    }
    const camOffLayer = getCamOffLayer(canvas)

    if (cameraOn) {
      await addLayer(layer, client.current)
    } else {
      await addLayer(camOffLayer, client.current)

    }
  }

  // Handle microphone device changes
  const renderActiveAudioDevice = (selectedAudioDevice) => {
    const mixerDevice = {
      name: LAYER_NAME.MIC,
      device: selectedAudioDevice,
      muted: !mikeOn, //Why is mikeOn false?
    }
    addMixerDevice(mixerDevice, client.current)
  }

  const handlePermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      for (const track of stream.getTracks()) {
        track.stop()
      }
      addDevicePermissions({ video: true, audio: true })
    } catch (err) {
      addDevicePermissions({ video: false, audio: false })
      openNotification(err.message)
    }
  }

  const initLayers = async () => {
    // If the user has not provided permissions, get them.
    if (!devicePermissions.video) {
      try {
        await handlePermissions()
      } catch (err) {
        // If we still don't have permissions after requesting them display the error message
        if (!devicePermissions.video && !devicePermissions.audio) {
          openNotification(constants.NOTIFICATION_MESSAGES.ACCESS_DEVICE_FAILED)
        }
      }
    }

    // Log errors in the browser console
    client.current.config.logLevel = client.current.config.LOG_LEVEL.ERROR

    // Attach the preview canvas to the client
    client.current.attachPreview(canvasRef.current)

    let vd
    let ad

    try {
      // Get video devices
      vd = await getVideoDevices()
      addVideoDevices(vd)

      // Get audio devices
      ad = await getAudioDevices()
      addAudioDevices(ad)
    } catch (err) {
      openNotification(constants.NOTIFICATION_MESSAGES.DEVICE_NOT_FOUND)
    }

    try {
      // Render the video device on the broadcast canvas
      setActiveVideoDevice(activeVideoDevice ? activeVideoDevice : vd[0])
      renderActiveVideoDevice(activeVideoDevice ? activeVideoDevice : vd[0])

      // Render the audio device
      setActiveAudioDevice(activeAudioDevice ? activeAudioDevice : ad[0])

      //Prashant ==> We need this line for initialization. but the problem is it is being rendered whenever streaming stops
      renderActiveAudioDevice(activeAudioDevice ? activeAudioDevice : ad[0])
    } catch (err) {
      openNotification(constants.NOTIFICATION_MESSAGES.CANVAS_FAIL)
    }
  }

  const handleMicMute = async () => {
    const mixerDevice = {
      name: LAYER_NAME.MIC,
      device: activeAudioDevice,
      mikeOn: mikeOn,
    }

    const muted = await isMixerDeviceMuted(mixerDevice, client.current)
    if (muted) {
      setMikeOn(false)
    }
    else {
      setMikeOn(true)
    }
  }

  const handleCameraMute = async () => {
    const canvas = client.current.getCanvasDimensions()

    const camLayer = {
      device: activeVideoDevice,
      name: LAYER_NAME.CAM,
      index: 4,
      visible: true,
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
      type: 'VIDEO',
    }

    const camOffLayer = getCamOffLayer(canvas)

    if (cameraOn) {
      await removeLayer(camLayer, client.current)
      await addLayer(camOffLayer, client.current)
      toggleCamera(false)
    } else {
      await removeLayer(camOffLayer, client.current)
      await addLayer(camLayer, client.current)
      toggleCamera(true)
    }
  }

  const handleStream = async () => {
    if (ingestServer && streamKey) {
      if (isLive) {
        stopStream(client.current)
      } else {
        startStream(ingestServer, streamKey, client.current)
      }
    } else {
      openNotification(constants.NOTIFICATION_MESSAGES.NO_STREAM_KEY)
    }
  }

  const { status, bidResult } = useSelector(state => state.auction)



  const renderEmptyVideo = () => {
    if (isLive && !isLiveBroadcast && !isStoppingStream) {
      return <StreamRunning />
    } else if (!devicePermissions.video || !devicePermissions.audio) {
      return <EmptyVideo isAdmin={true} />
    }
  }

  return (
    <>
      <Script
        src='https://web-broadcast.live-video.net/1.5.1/amazon-ivs-web-broadcast.js'
        strategy='afterInteractive'
        onLoad={() => {
          const streamConfig = getConfigFromResolution('1080')
          const IVSClient = IVSBroadcastClient.create({
            streamConfig: streamConfig,
          })
          client.current = IVSClient
          initLayers()
        }}
      />
      <VideoWrapper>
        {renderEmptyVideo()}
        <CanvasWrapper
          key='STREAM_PREVIEW_VIDEO'
          id='cam-video-preview'
          permissions={devicePermissions.video}
          ref={canvasRef}
        ></CanvasWrapper>
      </VideoWrapper>
      <BroadcastButtons handleCameraMute={handleCameraMute} handleMicMute={handleMicMute} handleStream={handleStream} />
    </>
  )
}