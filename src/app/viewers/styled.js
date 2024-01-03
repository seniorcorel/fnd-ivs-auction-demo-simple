/* eslint-disable quotes */
import styled from 'styled-components'
import { landscapeOrientation } from '../styles/device'
import { tertiary900 } from '../styles/colours'

const Wrapper = styled.div(({ theme }) => ({
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

  [landscapeOrientation]: {
    display: 'grid',
    gridTemplateAreas: "'video bidArea' 'video footer'",
    gridTemplateRows: 'auto 3.25rem',
    gridTemplateColumns: '60vw auto',
    height: '100vh',
  }

}))

export default Wrapper