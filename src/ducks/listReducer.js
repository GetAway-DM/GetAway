import axios from 'axios'

const initialState = {
    listing: {},
    loading: false,
    errorMessage: ''
}

export const GET_LIST = 'GET_LIST'


export function getUserListing(){
    console.log(userListing)
    const userListing = axios
            .get('/api/listing/getlisting/${listing_id}')
            .then(res => res.data.results)
            .catch(error => error.message)

    const action = {
        type: GET_LIST,
        payload: userListing
    }
    return action
}

export default function listReducer(state = initialState, action) {
    switch (action.type){
        case GET_LIST + '_PENDING':
            return Object.assign({}, state, {loading: true})
        case GET_LIST + '_FULFILLED':
            return Object.assign({}, state, { listing: action.payload, loading: false})
        case GET_LIST + '_REJECTED':
            return Object.assign({}, state, { errorMessage: action.payload })
        default:
            return state
    }
}

