import { OPEN_MODAL, CLOSE_MODAL } from '../types'

const initialState = {
    type: null,
    isOpen: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                type: action.payload,
                isOpen: true
            }
        case CLOSE_MODAL:
            return {
                type: null,
                isOpen: false
            }
        default:
            return state
    }
}

export default reducer