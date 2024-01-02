
import { useEffect, useState } from 'react';
import { ChatRoom } from 'amazon-ivs-chat-messaging'

import { getChatToken } from './ivsChannel'

export const useChatTokenSetup = (userId) => {
  const [room, setRoom] = useState(null)

  useEffect(() => {

    if (!userId) return

    const interval = setInterval(async () => {
      if (!room) {
        const chatRoom = new ChatRoom({
          regionOrUrl: process.env.NEXT_PUBLIC_AWS_REGION,
          tokenProvider: () => getChatToken(userId),
        })
        chatRoom.connect();
        chatRoom.logLevel = 'info'
        setRoom(chatRoom)
        clearInterval(interval)
      }
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [userId])


  useEffect(() => {
    // If chat room listeners are not available, do not continue
    if (!room || !room.addListener) {
      return;
    }

    const unsubscribeOnConnected = room.addListener('connect', () => {
      console.log('connected!');
    });

    const unsubscribeOnDisconnected = room.addListener(
      'disconnect',
      (reason) => {
        console.log('disconnected: ', reason);
      }
    );

    const unsubscribeOnUserDisconnect = room.addListener(
      'userDisconnect',
      (disconnectUserEvent) => {
        console.log(`user disconnected: userID ${userId}`, disconnectUserEvent);
      }
    );

    const unsubscribeOnConnecting = room.addListener('connecting', () => {
      // Connecting to the chat room.
      console.log('connecting...');
    });

    const unsubscribeOnEventReceived = room.addListener(
      'event',
      (event) => {
        // Received an event
        console.log('event happend:', event);
      }
    );

    return () => {
      unsubscribeOnConnected();
      unsubscribeOnDisconnected();
      unsubscribeOnUserDisconnect();
      unsubscribeOnConnecting();
      unsubscribeOnEventReceived();
    };
  }, [room]);

  return {
    room,
    setRoom
  }
}

export const START_AUCTION_EVENT = 'start_auction'
export const END_AUCTION_EVENT = 'end_auction'
export const SEND_BID = 'send_bid'
export const BID_STATS = 'bid_stats'
export const CONNECTED = 'connected'