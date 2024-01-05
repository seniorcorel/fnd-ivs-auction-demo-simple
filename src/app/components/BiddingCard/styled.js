import { Card, Button, CardContent, TextField, Typography } from '@mui/material'
import styled from 'styled-components'

export const FilledQuantity = styled.div`
  height: 0.25rem;
  border-left-style: solid;
  border-left-width: ${props => props.filledWidth};
  background: ${({ theme }) => theme.palette.primary.main};
  border-color: ${({ theme }) => theme.palette.primary.light};
`

export const Product = styled.div(({ theme }) => ({

  height: '216px',
  width: '100%',
  background: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}))

export const ProductName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ChipWrapper = styled.div`
  display: grid;
  grid: auto-flow / 1fr 1fr 1fr;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
`

export const ProductImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`

export const BiddingPosition = styled.div(() => ({
  position: 'absolute',
  right: '2rem',
  top: '50%',
  transform: 'translateY(calc(-50% - 2.265rem))',
}))


export const CardWrapper = styled(Card)(({ theme }) => ({
  width: '18.25rem',
  border: '0.5rem solid',
  borderRadius: '1rem',
  borderColor: theme.palette.primary.p600,
  color: 'white',
  backgroundColor: theme.palette.custom.tertiary900,
}))


export const BidWrapper = styled.div`
  position: relative;
`

export const AdminAuctionButtons = styled(Button)(({ theme, bgColor, bgColorHover }) => ({

  backgroundColor: bgColor,
  width: '100%',
  '&:hover': {
    backgroundColor: bgColorHover,
  },

  [theme.breakpoints.up('sm')]: {
    width: '15.25rem',
  },

  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },

}))

export const ContentWrapper = styled(CardContent)`
  padding: 1.5rem;
  &:last-child {
    border-bottom: none;
  }
`

export const EndAuctionButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.custom.errorSecondary};
  &:hover {
    background-color: ${({ theme }) => theme.palette.custom.errorSecondary};
    filter: brightness(85%);
  }
`

export const TextFieldBid = styled(TextField)`
/* Chrome, Safari, Edge, Opera */
input:: -webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`

export const HighestBidderText = styled(Typography)`
padding-bottom: 0.5rem;
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
`