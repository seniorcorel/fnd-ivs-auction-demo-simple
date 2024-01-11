/* eslint-disable quotes */
import styled from 'styled-components'
import { tertiary900 } from '../styles/colours'

export const Wrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  height: '100vh',
  width: '100%',
  backgroundColor: tertiary900,
  padding: '0.75rem',
  position: 'relative',
  boxSizing: 'border-box',


  [theme.breakpoints.up('sm')]: {
    flex: 'unset',
  },
}))