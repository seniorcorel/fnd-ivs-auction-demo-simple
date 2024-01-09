import { Button, Card } from '@mui/material'
import styled from 'styled-components'
import { tertiary800 } from '../../styles/colours'

export const AuctionNotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

export const AuctionNotAvailableSm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.custom.tertiary800};
  border-radius: 1rem;
  padding: 3rem 1.5rem;
  flex-grow: 1;
  overflow-y: scroll;
  grid-area: bidArea;
`

export const AuctionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.p500,
  marginTop: '1.25rem',
  boxShadow: 'none',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.secondary.p500,
    boxShadow: 'none',
  },

  [theme.breakpoints.up('sm')]: {
    width: '15.25rem',
  },
  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },

}))

export const AuctionUnAvailableWrapper = styled.div`
  position: absolute;
  right: 2rem;
  top: calc(50%);
  transform: translateY(-50%);
  height: 100%;
  max-height: 30rem;
`

export const CardWrapper = styled(Card)`
  height: 100%;
  width: 18.25rem;
  border: 0.5rem solid;
  border-radius: 1rem;
  border-color: ${({ theme }) => theme.palette.primary.p600};
  color: white;
  background-color: ${tertiary800};
`