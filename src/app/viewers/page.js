"use client"

/* eslint-disable no-console */
import React from 'react'
import Wrapper from './styled'
import Modal from '../components/Modal'
import useActions from '../hooks/useActions'
import { useSelector } from 'react-redux'
import Notification from '../components/Notification'
import constants from '../constants'
import UserCard from '../components/UserCard'
import VideoPlayer from '../components/VideoPlayer'

const Viewers = () => {
  const {
    toggleModal,
    closeNotification,
  } = useActions()
  const { type, isOpen } = useSelector(state => state.modal)
  const { isOpen: notificationOpen, type: notificationType, message } = useSelector(state => state.notification)
  const { status, bidResult } = useSelector(state => state.auction)
  const { isLive } = useSelector(state => state.stream)

  return (
    <Wrapper>
      <Notification
        type={notificationType}
        variant="filled"
        message={message}
        isOpen={notificationOpen}
        onClose={() => closeNotification()}
      />
      <Modal
        isOpen={isOpen}
        onClose={toggleModal}
        type={type}
        closable={type !== constants.MODAL_TYPE.END_AUCTION}
      />
      <VideoPlayer />
      <UserCard status={status} />
    </Wrapper>
  )
}

export default Viewers