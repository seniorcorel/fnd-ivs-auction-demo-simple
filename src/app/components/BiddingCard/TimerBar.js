import { useEffect, useRef, useState } from 'react'
import { FilledQuantity } from './styled'

const TimerBar = ({ timeLeft, durationMiliseconds }) => {
  const [filledWidth, setFilledWidth] = useState(0)
  const timerBarRef = useRef()
  const [totalWidth, setTotalWidth] = useState()

  useEffect(() => {
    const { width } = timerBarRef.current.getBoundingClientRect()
    setTotalWidth(width)
  }, [])

  useEffect(() => {
    if (!totalWidth) return
    const currentWidth = Math.round(totalWidth * (1 - (timeLeft / durationMiliseconds).toFixed(2)))
    setFilledWidth(currentWidth)
  }, [timeLeft])

  return (
    <FilledQuantity ref={timerBarRef} filledWidth={`${filledWidth}px`}></FilledQuantity>
  )
}

export default TimerBar