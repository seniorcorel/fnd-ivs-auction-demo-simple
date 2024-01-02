import { useSelector } from 'react-redux'
import VideoPlayer from '../VideoPlayer'
import SignedInUser from '../SignedInUser'
import SignedOutUser from '../SignedOutUser'
import BroadcastSettings from '../BroadcastSettings'
import AdminCard from '../AdminCard'
import constants from '../../constants'
import { useMediaQuery } from '@mui/material'
import { landscapeOrientation } from '../../styles/device'
import Modal from '../Modal'
import { useState } from 'react'
import useActions from '../../hooks/useActions'
import { useEffect } from 'react'

const AuctionWrapper = ({ canvasRef = null, handleCameraMute, handleMicMute, handleStream }) => {
  const { authenticated: isAuthenticated, isAdmin } = useSelector(state => state.auth)
  const { status } = useSelector(state => state.auction)
  const { pageType } = useSelector(state => state.page)
  const matches = useMediaQuery(landscapeOrientation)
  const [isOpen, setModalOpen] = useState(true)
  const { togglePage } = useActions()


  const handleModalClose = () => {
    setModalOpen(false)
    togglePage(constants.PAGE_TYPE.VIDEO)
  }

  useEffect(() => {
    setModalOpen(true)
  }, [pageType])

  return (
    <>
      {pageType === constants.PAGE_TYPE.VIDEO && (
        <VideoPlayer
          canvasRef={canvasRef}
          handleCameraMute={handleCameraMute}
          handleMicMute={handleMicMute}
          handleStream={handleStream}
        />
      )}
      {pageType === constants.PAGE_TYPE.SETTINGS && (
        matches ?
          <Modal isOpen={isOpen} onClose={handleModalClose} type={constants.MODAL_TYPE.BROADCAST} /> : <BroadcastSettings />
      )}

      {/* 1. non logged in user */}
      {!isAuthenticated && (
        <SignedOutUser status={status} />
      )}

      {/* 2. logged in user */}
      {(isAuthenticated && !isAdmin) &&
        <SignedInUser status={status} />
      }

      {/* 3. admin */}
      {(isAuthenticated && isAdmin) && (pageType === constants.PAGE_TYPE.VIDEO) && (
        <AdminCard status={status} />
      )}

    </>
  )
}

export default AuctionWrapper

