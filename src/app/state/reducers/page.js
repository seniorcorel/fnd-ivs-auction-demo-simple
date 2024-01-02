import { OPEN_PAGE } from '../types'

const initialState = {
  pageType: 'video', // currently 2 pages only: 'video' and 'settings'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_PAGE:
      return {
        pageType: action.payload,
      }
    default:
      return state
  }
}

export default reducer