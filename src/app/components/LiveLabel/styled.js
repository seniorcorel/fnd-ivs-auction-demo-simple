import styled from 'styled-components'

export const Label = styled.div`
  background-color: ${({ theme }) => theme.palette.custom.errorSecondary};
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.palette.custom.opacityWhite};
  z-index: 900;

`