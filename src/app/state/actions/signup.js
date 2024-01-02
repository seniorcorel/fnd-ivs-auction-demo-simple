import {
    SIGN_UP,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    CLOSE_MODAL,
    OPEN_NOTIFICATION
} from '../types'
import fetchClient from '../../utils/fetchClient'
import constants from '../../constants'

export const signUp = (userDetails) => {
    return async dispatch => {
        dispatch({ type: SIGN_UP })

        try {
            const { user, token } = await fetchClient('/signup', userDetails, 'POST')
            document.cookie = `token=${token}`
            dispatch({ type: SIGN_UP_SUCCESS, payload: user })
            dispatch({ type: constants.AUCTION_STATUS.NOT_STARTED })
            dispatch({
                type: OPEN_NOTIFICATION,
                payload: { type: constants.NOTIFICATION_TYPES.SUCCESS, message: constants.ACCOUNT_CREATED }
            })

            dispatch({ type: CLOSE_MODAL })
        } catch (err) {
            dispatch({ type: SIGN_UP_FAIL })
            dispatch({
                type: OPEN_NOTIFICATION,
                payload: { type: constants.NOTIFICATION_TYPES.ERROR, message: err.message }
            })
        }
    }
}