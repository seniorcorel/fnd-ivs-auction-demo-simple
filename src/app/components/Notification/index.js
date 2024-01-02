import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import constants from '../../constants'
import { SnackbarWrapper } from './styled'

const Notification = ({ isOpen, message, type, variant, onClose, autoHideDuration }) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const getIcon = (notificationType) => {
    const ICON_MAP = {
      [constants.NOTIFICATION_TYPES.ERROR]: <ErrorRoundedIcon />,
      [constants.NOTIFICATION_TYPES.SUCCESS]: <CheckCircleRoundedIcon />,
    }

    return ICON_MAP[notificationType] || <ErrorRoundedIcon />
  }
  const icon = getIcon(type)

  const notificationContent = isOpen ? (
    <SnackbarWrapper
      autoHideDuration={autoHideDuration || 5000}
      onClose={onClose}
      key={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
    >
      <Alert
        severity={type}
        icon={icon}
        variant={variant}
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        {message}
      </Alert>
    </SnackbarWrapper>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      notificationContent,
      document.getElementById('notification-root')
    )
  } else {
    return null
  }
}

export default Notification