import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../hooks/useActions'
import { Video, VideoWrapper, PlayerWrapper } from './styled'
import EmptyVideo from './EmptyVideo'
import LiveLabel from '../LiveLabel'
import { useMediaQuery } from '@mui/material'
import { landscapeOrientation } from '../../styles/device'
import BidResult from '../BidResult'

const VideoPlayer = () => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const playerWrapperRef = useRef()
  const { isAdmin } = useSelector(state => state.auth)
  const { bidResult, status } = useSelector(state => state.auction)
  const { getStream, setPlayerHeight } = useActions()
  const { isLive, playbackUrl } = useSelector(state => state.stream)
  const matchesLandscape = useMediaQuery(landscapeOrientation)
  const matches = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const [isPlaying, setIsPlaying] = useState(false)

  const interval = useRef();

  const callGetStream = () => {
    interval.current = setInterval(() => {
      getStream()
    }, 5000)
  }

  useEffect(() => {
    callGetStream()
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  useEffect(() => {
    if (playbackUrl) {
      clearInterval(interval.current)
    } else {
      callGetStream()
    }
  }, [playbackUrl])

  useEffect(() => {
    if (isPlaying) {
      playerRef.current.setMuted(false)
    }
  }, [isPlaying])

  useEffect(() => {
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


  return (
    <PlayerWrapper ref={playerWrapperRef}>
      {matchesLandscape && bidResult && <BidResult />}
      {isLive && <LiveLabel />}
      <VideoWrapper>
        {playbackUrl ? <Video muted={false} playsInline ref={videoRef} /> : <EmptyVideo isAdmin={isAdmin} />}
      </VideoWrapper>
    </PlayerWrapper >
  )
}

export default VideoPlayer