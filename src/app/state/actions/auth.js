import {
    GET_AUTHENTICATED_USER_SUCCESS, LOG_OUT, SET_GUEST_USER,
} from '../types'
import fetchClient from '../../utils/fetchClient'

export const getAuthenticatedUser = (token) => {
    return async dispatch => {

        try {
            const userDetails = await fetchClient(`/verifycookie`, token, 'POST')
            dispatch({ type: GET_AUTHENTICATED_USER_SUCCESS, payload: userDetails })

        } catch (error) {
            console.log(error)
        }
    }
}

export const setGuestUser = () => {
    return dispatch => {
        dispatch({ type: SET_GUEST_USER })
    }
}

export const logOut = (username) => {
    return async dispatch => {
        try {
            await fetchClient('/logOut', username, 'POST')
            dispatch({ type: LOG_OUT })
            document.cookie = `token=; Max-Age=-1;`
        } catch (error) {
            console.log(error)
        }
    }
}
