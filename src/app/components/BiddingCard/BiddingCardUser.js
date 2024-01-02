import { useEffect, useState } from 'react'
import { Button, Chip, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import constants from '../../constants'
import Content from './Content'
import { ChipWrapper, TextFieldBid } from './styled'
import InputAdornment from '@mui/material/InputAdornment'
const { YOUR_BID, BID, BID_AMOUNT } = constants

const BiddingCardUser = ({ sendBid }) => {

  const { product, maxBid } = useSelector(state => state.auction)
  const [userBidAmount, setUserBidAmount] = useState(0)
  const [error, setError] = useState({
    hasError: false,
    message: ''
  })


  const handleError = (newP) => {
    const hasDecimal = 0 <= newP.toString().indexOf('.')
    let newPrice = parseFloat(newP)

    if (!newPrice) {
      setError({
        hasError: true,
        message: constants.VALID_BID
      })
    } else if ((newPrice < parseFloat(maxBid.bidValue))) {
      setError({
        hasError: true,
        message: constants.HIGHER_BID
      })
    } else if (newPrice > 9999999.99) {
      setError({
        hasError: true,
        message: constants.MAX_VALUE
      })
    } else if (hasDecimal) {
      const hasDigitAfterDot = newPrice.toString().split('.')[1]
      if (hasDigitAfterDot && hasDigitAfterDot.length > 2) {
        setError({
          hasError: true,
          message: constants.TWO_DECIMAL
        })
      } else {
        setError({
          hasError: false,
          message: ''
        })
      }
    } else {
      setError({
        hasError: false,
        message: ''
      })
    }
  }

  const handleAddPrice = (amount) => {
    const updatedPrice = parseFloat(userBidAmount) + amount
    setUserBidAmount(userBidAmount => (parseFloat(userBidAmount) + amount).toFixed(2).toString())
    handleError(updatedPrice)
  }

  const handleBidding = () => {
    if (parseFloat(userBidAmount) <= parseFloat(maxBid.bidValue)) {
      handleError(parseFloat(userBidAmount))
      return
    }
    sendBid(parseFloat(userBidAmount).toFixed(2).toString())
  }

  const handleChange = (value) => {
    setUserBidAmount(value)
    handleError(value)
  }

  useEffect(() => {
    if (!!product.initialBid) {
      setUserBidAmount(product.initialBid)
    }
  }, [])

  useEffect(() => {
    setUserBidAmount(maxBid.bidValue)
  }, [maxBid])



  return (
    <Content noBorder>
      <Typography color='custom.lightGrey' sx={{ paddingBottom: 1 }}>{YOUR_BID}:</Typography>
      <ChipWrapper>
        <Chip label="+ $1" onClick={() => handleAddPrice(1)} />
        <Chip label="+ $5" onClick={() => handleAddPrice(5)} />
        <Chip label="+ $10" onClick={() => handleAddPrice(10)} />
      </ChipWrapper>
      <TextFieldBid
        type='number'
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          max: 9999999.99,
        }}
        InputProps={{
          startAdornment: <InputAdornment sx={{ marginRight: -1 }} position="start">$</InputAdornment>,
          inputProps: { min: 0, max: 10 }
        }}
        id="outlined-required"
        label={BID_AMOUNT}
        sx={{ paddingBottom: 3.5, width: '100%' }}
        value={userBidAmount}
        onChange={(e) => handleChange(e.target.value)}
        error={!!error.hasError}
        helperText={error.message}
      />
      <Button
        onClick={handleBidding}
        variant="contained"
        fullWidth={true}
        disabled={!!error.hasError}
      >
        {BID}
      </Button>
    </Content>
  )
}

export default BiddingCardUser