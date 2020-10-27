const initialState = {
  selectedProperty: {},
}

export const GET_LOCATION = 'GET_LOCATION'

export function getLocation(address) {
  const action = {
    type: GET_LOCATION,
    payload: address,
  }
  return action
}

export default function locationReducer(state = initialState, action) {
  console.log('hitReducer', action)
  switch (action.type) {
    case 'GET_LIST':
      console.log(action)
      return { ...state, selectedProperty: action.payload }
    default:
      return state
  }
}
