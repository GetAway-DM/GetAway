const initialState = {
  selectedProperty: { lat: 37.7749, lng: -122.4194 },
}

export const GET_LOCATION = 'GET_LOCATION'

export function getLocation(address) {
  console.log('hitGetLocation')
  const action = {
    type: GET_LOCATION,
    payload: address,
  }
  return action
}

export default function locationReducer(state = initialState, action) {
  console.log('hitReducer', action)
  switch (action.type) {
    case GET_LOCATION:
      console.log(action)
      return { ...state, selectedProperty: action.payload }
    default:
      return state
  }
}
