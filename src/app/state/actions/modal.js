import { 
    OPEN_MODAL,
    CLOSE_MODAL,
    CLOSE_NOTIFICATION
} from '../types'

export const toggleModal = (type = null) => {
    return dispatch => {
        if (type) {
            dispatch(({ type: OPEN_MODAL, payload: type }))
        } else {
            dispatch({ type: CLOSE_MODAL })
            dispatch({ type: CLOSE_NOTIFICATION  })
        }
    }
}