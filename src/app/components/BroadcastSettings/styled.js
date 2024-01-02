import styled from 'styled-components'

export const BroadCastWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.custom.tertiary800,
  height: '100%',
  borderRadius: '0.75rem',
  flex: '1',
  padding: '1.5rem'
}))