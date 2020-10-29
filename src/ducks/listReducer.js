const initialState = {
  listing: {},
  loading: false,
  errorMessage: '',
}

export const GET_LIST = 'GET_LIST'

export function getUserListing(listing) {
  const action = {
    type: GET_LIST,
    payload: listing,
  }
  return action
}

export default function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, listing: action.payload }
    default:
      return state
  }
}
