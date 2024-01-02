import { Snackbar } from '@mui/material'
import styled from 'styled-components'
import { landscapeOrientation } from '../../styles/device'

export const SnackbarWrapper = styled(Snackbar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    right: 'unset',
    left: '50% !important',
    top: '1.5rem !important',
    transform: 'translateX(-50%) !important',
    whiteSpace: 'nowrap !important'
  },

  [landscapeOrientation]: {
    top: '1.5rem !important',
  }

}))