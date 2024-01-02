import { SHOW_IMAGE, SET_PLAYER_HEIGHT } from '../types'

const initialState = {
    showImage: true,
    cardHeight: 0,
    playerHeight: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_IMAGE:
            return {
                ...state,
                showImage: action.payload.showImage,
                cardHeight: action.payload.cardHeight
            }
        case SET_PLAYER_HEIGHT:
            return {
                ...state,
                playerHeight: action.payload,
            }
        default:
            return state
    }
}

export default reducer