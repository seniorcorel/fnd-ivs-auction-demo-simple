import constants from '../../constants'
import {
    CLOSE_NOTIFICATION, OPEN_NOTIFICATION
} from '../types'

export const closeNotification = () => ({ type: CLOSE_NOTIFICATION })

export const openNotification = (message, type = constants.NOTIFICATION_TYPES.ERROR) => {
    return dispatch => {
        dispatch({
            type: OPEN_NOTIFICATION,
            payload: { message, type }
        })
    }
}