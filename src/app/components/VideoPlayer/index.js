import { useRef, useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import { Video, VideoWrapper, PlayerWrapper, CanvasWrapper } from './styled'
import EmptyVideo from './EmptyVideo'
import LiveLabel from '../LiveLabel'
import BroadcastButtons from '../BroadcastButtons'
import StreamRunning from './StreamRunning'
import { useMediaQuery } from '@mui/material'
import { landscapeOrientation } from '../../styles/device'
import BidResult from '../BidResult'

const VideoPlayer = ({ canvasRef, handleCameraMute, handleMicMute, handleStream }) => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const playerWrapperRef = useRef()
  const { channelArn } = useSelector(state => state.channel)
  const { isAdmin } = useSelector(state => state.auth)
  const { bidResult, status } = useSelector(state => state.auction)
  const { getStream, getChannel, getListChannels, setPlayerHeight } = useActions()
  const { isLive, devicePermissions, isLiveBroadcast, playbackUrl, cameraOn, isStoppingStream } = useSelector(state => state.stream)
  const matchesLandscape = useMediaQuery(landscapeOrientation)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [isPlaying, setIsPlaying] = useState(false)

  const memorizedStream = useCallback(
    (channelArn) => {
      getStream(channelArn)
    },
    [],
  )

  useEffect(() => {
    if (isAdmin && channelArn) {
      getChannel(channelArn)
    }
  }, [isAdmin, channelArn])

  useEffect(() => {
    if (!isAdmin) return
    if (isLive && !isLiveBroadcast) {
      handleCameraMute()
    }
  }, [isLive])

  useEffect(() => {
    let interval
    const setupChannels = async () => {
      const channels = await getListChannels()

      if (channels.length >= 1) {
        interval = setInterval(() => {
          memorizedStream(channels[0].arn)

        }, 5000)
        return
      }
    }
    setupChannels()

    return () => {
      clearInterval(interval)
    }
  }, [playbackUrl])

  useEffect(() => {
    if (isPlaying) {
      playerRef.current.setMuted(false)
    }
  }, [isPlaying])

  useEffect(() => {
    if (isAdmin) return
    if (!playbackUrl) return
    const { IVSPlayer } = window
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType
    const {
      create: createMediaPlayer,
    } = IVSPlayer

    playerRef.current = createMediaPlayer()
    playerRef.current.attachHTMLVideoElement(videoRef.current)
    playerRef.current.load(playbackUrl)
    playerRef.current.play()
    playerRef.current.addEventListener(READY, () => setIsPlaying(false))
    playerRef.current.addEventListener(PLAYING, () => setIsPlaying(true))
    playerRef.current.addEventListener(ENDED, () => setIsPlaying(false))
    playerRef.current.addEventListener(ERROR, () => setIsPlaying(false))

    return (() => {
      playerRef.current.removeEventListener(READY, () => setIsPlaying(false))
      playerRef.current.removeEventListener(PLAYING, () => setIsPlaying(false))
      playerRef.current.removeEventListener(ENDED, () => setIsPlaying(false))
      playerRef.current.removeEventListener(ERROR, () => setIsPlaying(false))
      playerRef.current.pause()
      playerRef.current.delete()
      playerRef.current = null
      videoRef.current = null

    })
  }, [videoRef, playbackUrl])


  useEffect(() => {
    if (matches) {
      const { height } = playerWrapperRef.current.getBoundingClientRect()
      setPlayerHeight(height)
    }
  }, [status])


  const renderEmptyVideo = () => {
    if (isLive && !isLiveBroadcast && !isStoppingStream) {
      return <StreamRunning />
    } else if (!devicePermissions.video || !devicePermissions.audio) {
      return <EmptyVideo isAdmin={isAdmin} />
    }
  }

  return (
    <PlayerWrapper ref={playerWrapperRef}>
      {matchesLandscape && bidResult && <BidResult />}
      {isLive && <LiveLabel />}
      <VideoWrapper>
        {isAdmin ? (
          <>
            {renderEmptyVideo()}
            <CanvasWrapper
              key='STREAM_PREVIEW_VIDEO'
              id='cam-video-preview'
              permissions={devicePermissions.video}
              ref={canvasRef}
            ></CanvasWrapper>
          </>
        ) : (
          playbackUrl ? <Video muted={false} playsInline ref={videoRef} /> : <EmptyVideo isAdmin={isAdmin} />
        )}
      </VideoWrapper>
      {isAdmin && <BroadcastButtons handleCameraMute={handleCameraMute} handleMicMute={handleMicMute} handleStream={handleStream} />}

    </PlayerWrapper >
  )
}

export default VideoPlayer