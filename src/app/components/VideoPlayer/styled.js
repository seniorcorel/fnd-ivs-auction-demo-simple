import { Typography } from '@mui/material'
import styled from 'styled-components'

export const EmptyVideoWrapper = styled.div`
  display: flex;
  flex-directon: column;
  align-items: center;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: black;
`

export const VideoOfflineTitle = styled(Typography)`
  margin-top: 1rem;
  line-height: 1;
  margin-bottom: 0.8rem;
  align-self: center;
  opacity: 0.6;
`

export const Video = styled.video`
  width: 100%;
  margin: auto;
  background-color: black;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

export const CanvasWrapper = styled.canvas`
  display: ${({ permissions }) => permissions ? 'block' : 'none'};
  width: 100%;
`
//make the height 100% after height passes calc(100% - 6rem)

export const VideoWrapper = styled.div(({ theme }) => ({
  backgroundColor: 'black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  aspectRatio: '16/ 9',
  overflow: 'hidden',

  [theme.breakpoints.up('md')]: {
    aspectRatio: 'unset',
    height: '100%',
  },

}))

export const PlayerWrapper = styled.div(({ theme }) => ({
  gridArea: 'video',
  backgroundColor: 'black',
  position: 'relative',
  aspectRatio: '16/ 9',
  borderRadius: '0.75rem',
  overflow: 'hidden',

  [theme.breakpoints.up('md')]: {
    aspectRatio: 'unset',
    paddingBottom: '4rem',
    paddingTop: '4rem',
    flex: '1'
  },

  [theme.breakpoints.down('md')]: {
    overflow: 'unset',
  },
}))
