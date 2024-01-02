import styled from 'styled-components'
import { landscapeOrientation } from '../../styles/device'

export const SettingsPageWrapper = styled.div`
  width: 25.75rem;

  ${landscapeOrientation} {
    width: 100%;
  }
`