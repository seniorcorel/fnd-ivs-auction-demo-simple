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
import BroadcastButtons from "../BroadcastButtons";

export default function Broadcast() {
  const {
    openNotification,
    setMikeOn,
    toggleCamera,
    addAudioDevices,
    addVideoDevices,
    addDevicePermissions,
    setActiveAudioDevice,
    setActiveVideoDevice,
    getStream,
  } = useActions()

  const { cameraOn, mikeOn, devicePermissions, activeVideoDevice, activeAudioDevice, isLive } = useSelector(state => state.stream)
  const { streamKey, ingestServer } = useSelector(state => state.channel)
  const client = useRef(null)
  const canvasRef = useRef(null)
  const { LAYER_NAME } = constants
  const { startStream, stopStream } = useStream()
  const { addLayer, removeLayer } = useLayers([])

  const { addMixerDevice, isMixerDeviceMuted } = useMixer([])

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

  const getDevices = async () => {
    let vd
    let ad

    try {
      // Get video devices
      const videoDevices = await navigator.mediaDevices.enumerateDevices()
      vd = videoDevices.filter(
        (device) => device.kind === 'videoinput'
      )
      addVideoDevices(vd)

      // Render the video device on the broadcast canvas
      setActiveVideoDevice(activeVideoDevice ? activeVideoDevice : vd[0])
      renderActiveVideoDevice(activeVideoDevice ? activeVideoDevice : vd[0])

      // Get audio devices
      const audioDevices = await navigator.mediaDevices.enumerateDevices()
      ad = audioDevices.filter(
        (device) => device.kind === 'audioinput'
      )
      addAudioDevices(ad)

      // Render the audio device
      setActiveAudioDevice(activeAudioDevice ? activeAudioDevice : ad[0])
      renderActiveAudioDevice(activeAudioDevice ? activeAudioDevice : ad[0])
    } catch (err) {
      openNotification(err)
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

  const interval = useRef()

  const getPlaybackUrl = async () => {
    interval.current = setInterval(() => {
      getStream()
    }, 3000)
  }

  useEffect(() => {
    clearInterval(interval.current)
  }, [isLive])

  const handleStream = async () => {
    const IS = localStorage.getItem('ingestServer')
    const SK = localStorage.getItem('streamKey')
    if (IS && SK) {
      if (isLive) {
        stopStream(client.current, getPlaybackUrl)
      } else {
        startStream(client.current, IS, SK, getPlaybackUrl)
      }
    } else {
      openNotification(constants.NOTIFICATION_MESSAGES.NO_STREAM_KEY)
    }
  }

  const initLayers = async () => {
    client.current = IVSBroadcastClient.create({
      streamConfig: IVSBroadcastClient.STANDARD_LANDSCAPE,
    });

    client.current.attachPreview(canvasRef.current);
    // If the user has not provided permissions, get them.
    await handlePermissions()
    await getDevices()
  }

  return (
    <>
      <Script
        src='https://web-broadcast.live-video.net/1.5.1/amazon-ivs-web-broadcast.js'
        strategy='afterInteractive'
        onLoad={() => {
          initLayers()
        }}
      />
      <VideoWrapper>
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