/* eslint-disable quotes */
import styled from 'styled-components'
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

  [theme.breakpoints.down('md')]: {
    height: `calc(100vh - 5.2rem)`,
    paddingBottom: '1px',
  },

}))

export default Wrapper