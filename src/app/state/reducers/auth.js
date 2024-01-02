import {
    SIGN_IN,
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    GET_AUTHENTICATED_USER_SUCCESS,
    SET_GUEST_USER,
    LOG_OUT
} from '../types'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
    loading: false,
    authenticated: false,
    isAdmin: false,
    username: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE: /* All SSR reducer state will show up in the payload */
            return {
                ...action.payload.auth,
            }
        case SIGN_IN:
            return {
                ...state,
                loading: true
            }
        case SIGN_IN_FAIL:
            return {
                ...state,
                loading: false
            }
        case SIGN_IN_SUCCESS:
            return {
                loading: false,
                authenticated: true,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username
            }
        case SIGN_UP:
            return {
                ...state,
                loading: true
            }
        case SIGN_UP_SUCCESS:
            return {
                loading: false,
                authenticated: true,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username
            }
        case SIGN_UP_FAIL:
            return {
                ...state,
                loading: false
            }
        case GET_AUTHENTICATED_USER_SUCCESS:
            return {
                ...state,
                authenticated: true,
                isAdmin: action.payload.isAdmin,
                username: action.payload.username
            }
        case SET_GUEST_USER:
            return {
                ...state,
                username: 'guest'
            }
        case LOG_OUT:
            return { ...initialState }
        default:
            return state
    }
}

export default reducer