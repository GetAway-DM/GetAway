import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools} from 'redux-devtools-extension';
import authReducer from './authReducer';
import listReducer from './listReducer';


const rootReducer = combineReducers({
    authReducer,
    listReducer
})

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware))
)
