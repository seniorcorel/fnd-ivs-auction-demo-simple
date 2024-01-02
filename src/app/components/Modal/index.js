import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ModalOverlay, ModalBox, IconWrapper, ConfirmationBox } from './styled'
import IconButton from '@mui/material/IconButton'
import CloseRounded from '@mui/icons-material/CloseRounded'
import constants from '../../constants'
import StartAuctionForm from '../../components/StartAuctionForm'
import ProductModal from '../ProductModal'
import SettingsModal from '../SettingsModal'
import SettingsPage from '../SettingsPage'
import EndAuctionConfirmation from '../EndAuctionConfirmation'

const Modal = ({
  isOpen, onClose, type, closable = true,
}) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const { MODAL_TYPE } = constants

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleClose = (e) => {
    e.preventDefault()

    if (onClose) {
      onClose()
    }
  }

  const renderContent = modalType => {
    const content = {
      [MODAL_TYPE.START_AUCTION]: <StartAuctionForm />,
      [MODAL_TYPE.PRODUCT]: <ProductModal />,
      [MODAL_TYPE.SETTINGS]: <SettingsModal />,
      [MODAL_TYPE.BROADCAST]: <SettingsPage />,
    }

    return content[modalType]
  }

  const renderCloseButton = (
    <IconWrapper>
      <IconButton onClick={handleClose}>
        <CloseRounded sx={{ color: 'custom.opacityWhite' }} />
      </IconButton>
    </IconWrapper>
  )

  const modalContent = isOpen ? (
    <>
      <ModalOverlay onClick={closable ? handleClose : null} />
      {type === MODAL_TYPE.END_AUCTION ? (
        <ConfirmationBox>
          <EndAuctionConfirmation handleClose={handleClose} />
        </ConfirmationBox>
      ) : (
        <ModalBox onClick={e => e.stopPropagation()}>
          {closable && renderCloseButton}
          {renderContent(type)}
        </ModalBox>
      )}
    </>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    )
  } else {
    return null
  }
}

export default Modal