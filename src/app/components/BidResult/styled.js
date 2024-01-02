import styled from 'styled-components'
import { Alert } from '@mui/material'

export const BidResultWrapper = styled(Alert)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  fontWeight: 'light',
  top: '1.5rem',
  padding: '0 0.5rem',
  zIndex: '900',

  '.MuiAlert-message, .MuiAlert-icon': {
    padding: '0.25rem 0',
  },

  [theme.breakpoints.up('md')]: {
    top: '0',
    padding: '0.375rem 1rem',
    '.MuiAlert-message, .MuiAlert-icon': {
      padding: '0.5rem 0',
    },
  },
}))