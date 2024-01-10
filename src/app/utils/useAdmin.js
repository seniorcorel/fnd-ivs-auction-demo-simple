import { useCallback, useEffect } from 'react'
import { SendMessageRequest } from 'amazon-ivs-chat-messaging'
import { useSelector } from 'react-redux'
import {
  useChatTokenSetup,
  SEND_BID,
  BID_STATS,
  START_AUCTION_EVENT,
  END_AUCTION_EVENT,
  CONNECTED
} from './useChatTokenSetup'
import useActions from '../state/useActions'
import constants from '../constants'
const { STARTED } = constants.AUCTION_STATUS

const useAdmin = () => {
  const { username } = useSelector(state => state.auction)
  const { room } = useChatTokenSetup(username)
  const { bidAuction } = useActions()
  const { product, maxBid, status } = useSelector(state => state.auction)

  const sendAuctionStats = (bidValue, bidSender, inputProduct) => {
    const request = new SendMessageRequest('skip', {
      eventType: BID_STATS,
      bidValue,
      bidSender,
      product: JSON.stringify(inputProduct)
    })
    room.sendMessage(request)
  }

  useEffect(() => {
    if (!room || !product || product.productName === null) {
      return
    }

    const unsubscribeOnMessage = room.addListener('message', (message) => {
      if (message.attributes.eventType === SEND_BID) {
        //Ignore bids that come in with less that 5 seconds remaining.
        const remainingTimeMilliSecondsInAuction = (product.auctionStartTimeMilliSeconds + (product.durationSeconds * 1000)) - Date.now() - 5000
        if (status !== STARTED || remainingTimeMilliSecondsInAuction < 0) {
          return
        }
        sendAuctionStats(message.attributes.bid, message.sender.userId, product)
        bidAuction({
          bidValue: message.attributes.bid,
          bidSender: message.sender.userId,
          bidResult: null,
          product: JSON.stringify(product),
          username: message.attributes.bidSender
        })
      }
    })
    return () => {
      unsubscribeOnMessage()
    }
  }, [room, product])

  useEffect(() => {
    const sendHeartBeat = () => {
      //Dont send out a heart beat if less than 20 seconds remaining.
      const remainingTimeMilliSecondsInAuction = (product.auctionStartTimeMilliSeconds + (product.durationSeconds * 1000)) - Date.now() - 20000
      if (status === STARTED && remainingTimeMilliSecondsInAuction > 0) {
        sendStartAuction(room, product, maxBid)
      }
    }
    const heartBeatIntervalId = setInterval(() => { sendHeartBeat() }, 10000)

    return () => {
      clearInterval(heartBeatIntervalId)
    }
  }, [room, product, maxBid, status])

  const sendStartAuction = (room, product, maxBid) => {
    if (!room || room.state !== CONNECTED || !product || product.productName === null) {
      return
    }
    const request = new SendMessageRequest('skip', {
      eventType: START_AUCTION_EVENT,
      product: JSON.stringify(product),
      maxBid: JSON.stringify(maxBid)
    })
    room.sendMessage(request)
  }

  const startAuction = useCallback(() => {
    sendStartAuction(room, product, maxBid)
  }, [room, product, maxBid])

  const endAuction = useCallback((type, maxBidSender) => {
    if (!room || room.state !== CONNECTED || !product || product.productName === null) {
      return
    }
    const request = new SendMessageRequest('skip', {
      eventType: END_AUCTION_EVENT,
      maxBidSender: maxBidSender,
      bidResult: type, //either CANCELLED, NO_BID or SOLD
      product: JSON.stringify(product),
      maxBid: JSON.stringify(maxBid)
    })
    room.sendMessage(request)
  }, [room, product, maxBid])

  return { startAuction, endAuction }
}

export default useAdmin
