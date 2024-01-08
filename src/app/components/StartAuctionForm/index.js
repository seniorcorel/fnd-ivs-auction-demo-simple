import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'

import { useSelector } from 'react-redux'
import constants from '../../constants'
import { useForm } from 'react-hook-form'
import ImagePreview from '../../components/ImagePreview'
import useActions from '../../state/useActions'
import { useState, useEffect } from 'react'
import { TextFieldBid } from './styled'


const StartAuctionForm = () => {
  const { PRODUCT_NAME, DURATION, STARTING_BID, DESCRIPTION, IMAGE_LINK } = constants.PRODUCT
  const { toggleModal, changeAuctionStatus, openNotification } = useActions()
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({ mode: 'all' })
  const imageLink = watch([IMAGE_LINK.type])[0]

  const handleStartAuction = (data) => {
    toggleModal()
    changeAuctionStatus({
      status: constants.AUCTION_STATUS.STARTED,
      product: {
        ...data,
        initialBid: parseFloat(data.initialBid).toFixed(2).toString()
      }
    })
    openNotification(constants.NOTIFICATION_MESSAGES.AUCTION_CREATED, constants.NOTIFICATION_TYPES.SUCCESS)
  }

  const handleLoadImage = (type) => {
    setImageLoading(false)
    setImageLoaded(type)
    setImageError(!type)
  }

  useEffect(() => {
    if (!imageLink) {
      setImageError(false)
      setImageLoaded(false)
      setImageLoading(false)
    } else if (!imageLoaded && !imageError) {
      // *only execute when previous image value is null
      setImageLoading(true)
    }
  }, [imageLink])

  return (
    <>
      <Typography color="custom.white" variant="h4" sx={{ mb: 4.5 }}>{constants.START_AUCTION}</Typography>

      <form onSubmit={handleSubmit(handleStartAuction)}>
        <TextField
          label={PRODUCT_NAME.label}
          error={!!errors[PRODUCT_NAME.type]}
          fullWidth={true}
          helperText={errors[PRODUCT_NAME.type]?.message}
          sx={{ mb: 5.2 }}
          {...register(PRODUCT_NAME.type, {
            required: PRODUCT_NAME.required,
            pattern: {
              value: constants.USERNAME_REGEX,
              message: `Product name ${constants.FOUR_TO_FORTY}`,
            }
          })}
        />

        <TextField
          label={DESCRIPTION.label}
          error={!!errors[DESCRIPTION.type]}
          fullWidth={true}
          rows={2}
          multiline={true}
          helperText={errors[DESCRIPTION.type]?.message}
          FormHelperTextProps={{
            sx: { bottom: '0.1875rem' }
          }}
          sx={{ mb: 1.75, pb: 3.5 }}
          {...register(DESCRIPTION.type, {
            required: DESCRIPTION.required,
            maxLength: { value: 150, message: constants.PRODUCT_DESCRIPTION_VALIDATION },
          })}
        />
        <Box display="flex" sx={{ gap: '1rem', mb: 5.25 }} >
          <TextField
            label={DURATION.label}
            error={!!errors[DURATION.type]}
            fullWidth={true}
            select={true}
            defaultValue=""
            helperText={errors[DURATION.type]?.message}
            SelectProps={{
              MenuProps: {
                disableScrollLock: true
              }
            }}
            inputProps={
              register(DURATION.type, {
                required: DURATION.required
              })
            }
          >
            <MenuItem value={1}>{constants.ONE_MINUTE}</MenuItem>
            <MenuItem value={2}>{constants.TWO_MINUTE}</MenuItem>
            <MenuItem value={3}>{constants.THREE_MINUTE}</MenuItem>
            <MenuItem value={4}>{constants.FOUR_MINUTE}</MenuItem>
            <MenuItem value={5}>{constants.FIVE_MINUTE}</MenuItem>
          </TextField>

          <TextFieldBid
            type='number'
            label={STARTING_BID.label}
            error={!!errors[STARTING_BID.type]}
            fullWidth={true}
            helperText={errors[STARTING_BID.type]?.message}
            InputProps={{
              startAdornment: <InputAdornment sx={{ marginRight: -1 }} position="start">$</InputAdornment>,
            }}
            inputProps={{
              step: 'any',
            }}
            {...register(STARTING_BID.type, {
              required: constants.VALID_BID,
              pattern: {
                value: constants.PRICE_REGEX,
                message: constants.TWO_DECIMAL
              },
              max: { value: 9999999.99, message: constants.MAX_VALUE },
              min: { value: 0.01, message: constants.MIN_STARTING_AMOUNT }
            })}
          />
        </Box>

        <Box display="flex" sx={{ mb: 6.125 }}>
          <ImagePreview
            imageLoading={imageLoading}
            imageLink={imageLink}
            imageError={imageError}
            handleLoadImage={handleLoadImage}
          />

          <TextField
            label={IMAGE_LINK.label}
            fullWidth={true}
            error={!!imageError}
            helperText={imageError && constants.IMAGE_LINK_VALIDATION}
            {...register(IMAGE_LINK.type, {
              validate: () => !imageError
            })}
            sx={{
              '& .MuiInputBase-input': {
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disabled={imageLoading}
          sx={{ pt: 1.25, pb: 1.25 }}
        >
          {constants.START_AUCTION}
        </Button>
      </form>
    </>
  )
}

export default StartAuctionForm