import {
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