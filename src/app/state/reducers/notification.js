import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from '../types'

const initialState = {
    type: null,
    message: null,
    isOpen: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLOSE_NOTIFICATION:
            return {
                type: null,
                message: null,
                isOpen: false
            }
        case OPEN_NOTIFICATION:
            return {
                type: action.payload.type,
                message: action.payload.message,
                isOpen: true
            }
        default:
            return state
    }
}

export default reducer