const initialState ={
    listing: {},
    loading: false,
    errorMessage: ''
}

export const GET_LIST = 'GET_LIST'

export function getUserListing(listing){
    console.log(listing)
    const action = {
        type: GET_LIST,
        payload: listing,
    }
    return action
}

export default function listReducer(state = initialState, action) {
    console.log('hitReducer', action )
    switch(action.type){
        case 'GET_LIST':
            console.log(action)
            return { ...state, listing: action.payload }
        default:
            return state
    }
}
