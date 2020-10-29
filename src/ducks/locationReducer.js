const initialState = {
  selectedProperty: { lat: 37.7749, lng: -122.4194 },
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
  switch (action.type) {
    case GET_LOCATION:
      return { ...state, selectedProperty: action.payload }
    default:
      return state
  }
}
