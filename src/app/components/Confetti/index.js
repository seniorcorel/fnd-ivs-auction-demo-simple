import ReactConfetti from 'react-confetti'
import ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

const Confetti = () => {
  const [{ width, height }, setWindowSize] = useState({ window: undefined, height: undefined })
  const [isBrowser, setIsBrowser] = useState()

  const handleResize = () => {
    const confettiRoot = document.getElementById('confetti-root')
    setWindowSize({
      width: confettiRoot.offsetWidth,
      height: confettiRoot.offsetHeight,
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsBrowser(true)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)

  }, [])

  if (isBrowser) {
    return ReactDOM.createPortal(
      <ReactConfetti
        width={width}
        height={height}
        colors={['#8543D4', '#05DFDF']}
      />,
      document.getElementById('confetti-root')
    )
  } else {
    return null
  }
}

export default Confetti