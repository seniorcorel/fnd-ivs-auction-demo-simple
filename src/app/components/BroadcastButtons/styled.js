import { Button } from '@mui/material'
import styled from 'styled-components'


export const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 0.6rem;
  color: white;
  display: flex;
  gap: 0.8rem;
  background: ${({ theme }) => theme.palette.custom.opacityBlack};
  padding: 0.5rem;
  border-radius: 2rem;
  margin: auto;
  left: 50%;
  transform: translateX(-50%);
`

export const BroadcastButton = styled(Button)`
  width: 2.25rem;
  height: 2.25rem;
  min-width: unset;
  background-color: ${({ theme }) => theme.palette.custom.lightGrey};
  color: ${({ theme }) => theme.palette.custom.tertiary900};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.palette.custom.lightGrey};
  }
  &.disabled {
    background-color:  ${({ theme }) => theme.palette.custom.outlineGrey};
  }

  &.off {
  background-color: ${({ theme }) => theme.palette.custom.errorSecondary};
  color: ${({ theme }) => theme.palette.custom.opacityWhite};
  ＆.Mui-disabled {
    background-color: black;
  }
}
　＆.Mui-disabled {
    background-color: black;
  }

  &.Mui-disabled svg {
    color: rgba(255, 255, 255, 0.4);
  }

`

export const BroadCastButtonLast = styled(Button)`
  cursor: pointer;
  height: 2.25rem;
  width: 5rem;
  background-color: ${({ theme }) => theme.palette.primary.p600};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.custom.tertiary800};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.p600};
  }

  &.on {
    background-color: ${({ theme }) => theme.palette.custom.errorSecondary};
    color: white;
  }
    &.disabled {
    background-color:  ${({ theme }) => theme.palette.custom.outlineGrey};
    color: rgba(255, 255, 255, 0.4);
  }
`