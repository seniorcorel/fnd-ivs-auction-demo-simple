
import { useEffect, useState } from 'react';
import { ChatRoom } from 'amazon-ivs-chat-messaging'

const getChatToken = async (username) => {
  const result = await fetch('/api/chatToken', {
    method: 'POST',
    body: JSON.stringify({ username })
  })
  const chatTokenInfo = await result.json()

  if (!chatTokenInfo) return null
  chatTokenInfo.sessionExpirationTime = new Date(chatTokenInfo.sessionExpirationTime)
  chatTokenInfo.tokenExpirationTime = new Date(chatTokenInfo.tokenExpirationTime)
  return chatTokenInfo
}

export const useChatTokenSetup = (username) => {
  const [room, setRoom] = useState(null)

  useEffect(() => {
    if (!username) return
    const chatRoom = new ChatRoom({
      regionOrUrl: process.env.NEXT_PUBLIC_AWS_REGION,
      tokenProvider: () => getChatToken(username),
    })
    chatRoom.connect();
    chatRoom.logLevel = 'info'
    setRoom(chatRoom)

  }, [username])

  return {
    room,
  }
}

export const START_AUCTION_EVENT = 'start_auction'
export const END_AUCTION_EVENT = 'end_auction'
export const SEND_BID = 'send_bid'
