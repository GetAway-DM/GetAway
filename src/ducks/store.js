import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './authReducer'
import listReducer from './listReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
  authReducer,
  listReducer,
  locationReducer,
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
)
