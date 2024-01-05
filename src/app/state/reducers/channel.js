import {
    GET_CHANNEL,
    GET_CHANNEL_FAIL,
    GET_CHANNEL_SUCCESS,
    SET_BROADCAST_KEYS,
} from '../types'

const initialState = {
    channelArn: null,
    streamKey: null,
    ingestServer: null,
    loading: false,
    ingestEndpoint: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHANNEL:
            return {
                ...state,
                loading: true
            }
        case GET_CHANNEL_FAIL:
            return {
                ...state,
                loading: false,
            }
        case GET_CHANNEL_SUCCESS:
            const { channel, streamKey } = action.payload
            return {
                ...state,
                loading: false,
                channelArn: channel.arn,
                streamKey: streamKey.value,
                ingestServer: `rtmps://${channel.ingestEndpoint}:443/app/`,
                ingestEndpoint: channel.ingestEndpoint
            }
        case SET_BROADCAST_KEYS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export default reducer