import { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '../../state/useActions'
import { Video, VideoWrapper, PlayerWrapper } from './styled'
import EmptyVideo from './EmptyVideo'
import LiveLabel from '../LiveLabel'
import Script from 'next/script'

const VideoPlayer = () => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)
  const playerWrapperRef = useRef()
  const { getStream } = useActions()
  const { isLive, playbackUrl } = useSelector(state => state.stream)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let interval = setInterval(() => {
      getStream()
    }, 5000)
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  // useEffect(() => {
  //   if (isPlaying) {
  //     playerRef.current.setMuted(false)
  //   }
  // }, [isPlaying])

  useEffect(() => {
    if (!playbackUrl) return
    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType

    playerRef.current = IVSPlayer.create()
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

  return (
    <>
      <Script src="https://player.live-video.net/1.23.0/amazon-ivs-player.min.js" />
      <PlayerWrapper ref={playerWrapperRef}>
        {isLive && <LiveLabel />}
        <VideoWrapper>
          {playbackUrl ? <Video muted={false} playsInline ref={videoRef} /> : <EmptyVideo />}
        </VideoWrapper>
      </PlayerWrapper >
    </>
  )
}

export default VideoPlayer