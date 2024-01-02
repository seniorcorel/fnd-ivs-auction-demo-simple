import {
    CREATE_CHANNEL,
    GET_CHANNEL,
    GET_CHANNEL_FAIL,
    GET_CHANNEL_SUCCESS,
    GET_LIST_CHANNELS_SUCCESS,
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
        case GET_LIST_CHANNELS_SUCCESS:
            return {
                ...state,
                channelArn: action.payload
            }
        case GET_CHANNEL || CREATE_CHANNEL:
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
        default:
            return state
    }
}

export default reducer