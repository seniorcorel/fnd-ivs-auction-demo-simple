import { Button, TextField, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import constants from '../../constants'
import { SettingsPageWrapper } from './styled'

const SettingsPage = () => {
  const { streamKey, ingestServer } = useSelector(state => state.channel)

  const inputStyles = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <SettingsPageWrapper>
      <Typography color="custom.white" variant="h4">{constants.BROADCAST_SETTINGS}</Typography>
      <Typography color="primary.light" sx={{ mt: 1.5, mb: 4, fontWeight: 100 }}>{constants.STREAM_SETTINGS_SUB}</Typography>

      <TextField
        shrink={false}
        label={constants.INGEST_SERVER}
        fullWidth={true}
        sx={{ marginBottom: 4.8 }}
        value={ingestServer}
        InputProps={{
          endAdornment: <Button variant='contained' >{constants.COPY}</Button>,
        }}
        inputProps={{
          style: inputStyles,
        }}
        onClick={() => handleCopy(ingestServer)}
      />

      <TextField
        label={constants.STREAM_KEY}
        fullWidth={true}
        value={streamKey}
        sx={{ marginBottom: 1 }}
        type='password'
        InputProps={{
          endAdornment: <Button variant='contained'>{constants.COPY}</Button>,
          shrink: false,
        }}
        onClick={() => handleCopy(streamKey)}
      />
    </SettingsPageWrapper>
  )
}

export default SettingsPage