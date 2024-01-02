import styled from 'styled-components'
import { landscapeOrientation } from '../../styles/device'

export const ModalOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.palette.custom.modalOverlay};
    opacity: 0.9;
    backdrop-filter: blur(2rem);
    z-index: 1000;
`

export const ModalBox = styled.div(({ theme }) => ({
  width: '34.75rem',
  height: '100%',
  margin: '0 auto',
  boxSizing: 'border-box',
  background: theme.palette.custom.tertiary900,
  padding: '3.25rem 4.5rem 3rem 4.5rem',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.14), 0rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.12), 0.1875rem 0.0625rem 0.1875rem rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: '1001',

  [theme.breakpoints.up('sm')]: {
    height: 'fit-content',
    borderRadius: '0.75rem',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },

  [landscapeOrientation]: {
    display: 'block',
    width: '100%',
    height: '100%',
    borderRadius: 'unset',
    overflowY: 'scroll',
    top: '0',
    left: '0',
    bottom: '0',
    transform: 'translate(0, 0)',
    height: 'auto',
  },
}))

export const IconWrapper = styled.div`
    position: absolute;
    top: 0.91875rem;
    right: 0.91875rem;
`

export const ConfirmationBox = styled.div(({ theme }) => ({
  width: 'unset',
  margin: '0 auto',
  boxSizing: 'border-box',
  background: theme.palette.custom.tertiary900,
  padding: '1.5rem',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: '0rem 0.0625rem 0.0625rem rgba(0, 0, 0, 0.14), 0rem 0.125rem 0.0625rem rgba(0, 0, 0, 0.12), 0.1875rem 0.0625rem 0.1875rem rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  zIndex: '1001',
  whiteSpace: 'nowrap',
  borderRadius: '0.75rem',
}))