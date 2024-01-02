import { Tooltip } from '@mui/material'


const TooltipSm = ({ children, text }) => {
  return (
    <Tooltip title={text} placement='top' componentsProps={{
      tooltip: {
        sx: {
          backgroundColor: 'custom.lightGrey',
          color: 'custom.tertiary900',
        }
      },
    }}>
      {children}
    </Tooltip>
  )
}

export default TooltipSm