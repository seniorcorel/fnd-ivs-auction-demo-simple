import { useCallback, useEffect, useState } from 'react'
import { SendMessageRequest } from 'amazon-ivs-chat-messaging'
import {
  useChatTokenSetup,
  SEND_BID,
  START_AUCTION_EVENT,
  BID_STATS,
  END_AUCTION_EVENT,
  CONNECTED
} from './helper'
import useActions from '../state/useActions'
import constants from '../constants'
import { bidTypes } from '../components/BidResult'

export const useUser = (initUsername) => {
  const { room } = useChatTokenSetup(initUsername)
  const { changeAuctionStatus, bidAuction, openNotification } = useActions()

  useEffect(() => {
    if (!room) {
      return
    }
    const unsubscribeOnMessage = room.addListener('message', (message) => {

      const { eventType } = message.attributes
      const { userId } = message.sender

      if (eventType === START_AUCTION_EVENT) {
        const receivedProduct = JSON.parse(message.attributes.product)
        const receivedBid = JSON.parse(message.attributes.maxBid)
        const bidResult = initUsername === receivedBid.bidSender ? bidTypes.HIGHEST : null
        changeAuctionStatus({
          status: constants.AUCTION_STATUS.STARTED,
          product: receivedProduct,
          maxBid: receivedBid,
          bidResult,
        })
      } else if (eventType === BID_STATS) {
        const bidSender = message.attributes.bidSender
        bidAuction({
          bidValue: message.attributes.bidValue,
          bidSender: bidSender,
          bidResult: initUsername === bidSender ? bidTypes.HIGHEST : null,
          product: message.attributes.product,
          username: userId
        })
      } else if (eventType === END_AUCTION_EVENT) {
        const receivedProduct = JSON.parse(message.attributes.product)
        const receivedMaxBid = JSON.parse(message.attributes.maxBid)
        const messageBidResult = message.attributes.bidResult
        const maxBidSender = message.attributes.maxBidSender
        const userBidResult = ((messageBidResult === bidTypes.SOLD) && (maxBidSender === initUsername)) ? bidTypes.WINNER : messageBidResult
        changeAuctionStatus({ status: constants.AUCTION_STATUS.FINISHED, bidResult: userBidResult, product: receivedProduct, maxBid: receivedMaxBid })
      }
    })
    return () => {
      unsubscribeOnMessage()
    }
  }, [room, initUsername])

  const sendBid = useCallback(async (bid) => {
    if (!room || room.state !== CONNECTED) {
      return
    }

    const request = new SendMessageRequest('skip', {
      eventType: SEND_BID,
      bid,
    })
    try {
      await room.sendMessage(request);
      openNotification(constants.NOTIFICATION_MESSAGES.BID_SUCCESS, constants.NOTIFICATION_TYPES.SUCCESS)
    } catch (error) {
      openNotification(constants.NOTIFICATION_MESSAGES.BID_ERROR, constants.NOTIFICATION_TYPES.ERROR)
    }
  }, [room])

  return {
    sendBid,
  }
}
