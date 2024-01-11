"use client"

/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { redirect } from 'next/navigation';
import useActions from '../state/useActions'

import Modal from '../components/Modal'
import Notification from '../components/Notification'
import AdminCard from '../components/AdminCard'
import { PlayerWrapper } from '../components/VideoPlayer/styled'
import LiveLabel from '../components/LiveLabel'
import Broadcast from '../components/Broadcast'

import constants from '../constants'
import { Wrapper } from '../styles/page'

const Streamer = () => {

  const searchParams = useSearchParams()
  const username = searchParams.get('username')

  if (!username) {
    redirect('/')
  }

  const { toggleModal, closeNotification, setUser } = useActions()

  const { type, isOpen } = useSelector(state => state.modal)
  const { isOpen: notificationOpen, type: notificationType, message } = useSelector(state => state.notification)
  const { status } = useSelector(state => state.auction)
  const { isLive } = useSelector(state => state.stream)

  useEffect(() => {
    setUser({ username, isAdmin: true })
  }, [])

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
      <PlayerWrapper>
        {isLive && <LiveLabel />}
        <Broadcast />
      </PlayerWrapper>
      <AdminCard status={status} />
    </Wrapper>
  )
}

export default Streamer