
import { useEffect, useState } from 'react';
import { ChatRoom } from 'amazon-ivs-chat-messaging'

const getChatToken = async (userId) => {
  const result = await fetch('/api/chatToken', {
    method: 'POST',
    body: JSON.stringify({ isAdmin: userId === 'admin' })
  })
  const chatTokenInfo = await result.json()

  if (!chatTokenInfo) return null
  chatTokenInfo.sessionExpirationTime = new Date(chatTokenInfo.sessionExpirationTime)
  chatTokenInfo.tokenExpirationTime = new Date(chatTokenInfo.tokenExpirationTime)
  return chatTokenInfo
}

export const useChatTokenSetup = (userId) => {
  const [room, setRoom] = useState(null)

  useEffect(() => {
    if (!userId) return
    const chatRoom = new ChatRoom({
      regionOrUrl: process.env.NEXT_PUBLIC_AWS_REGION,
      tokenProvider: () => getChatToken(userId),
    })
    chatRoom.connect();
    chatRoom.logLevel = 'info'
    setRoom(chatRoom)

  }, [userId])

  return {
    room,
  }
}

export const START_AUCTION_EVENT = 'start_auction'
export const END_AUCTION_EVENT = 'end_auction'
export const SEND_BID = 'send_bid'
export const BID_STATS = 'bid_stats'
export const CONNECTED = 'connected'