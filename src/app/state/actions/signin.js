import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    CLOSE_MODAL,
    OPEN_NOTIFICATION,
} from '../types'
import fetchClient from '../../utils/fetchClient'
import constants from '../../constants'


export const signIn = (userDetails) => {
    return async dispatch => {
        dispatch({ type: SIGN_IN })

        try {
            const result = await fetchClient('/signin', userDetails, 'POST')
            document.cookie = `token=${result.token}`;

            dispatch({ type: SIGN_IN_SUCCESS, payload: result.user })
            dispatch({ type: constants.AUCTION_STATUS.NOT_STARTED })
            dispatch({ type: CLOSE_MODAL })
        } catch (err) {
            dispatch({ type: SIGN_IN_FAIL })
            dispatch({
                type: OPEN_NOTIFICATION,
                payload: { type: constants.NOTIFICATION_TYPES.ERROR, message: err.message }
            })
        }
    }
}