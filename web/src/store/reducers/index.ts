import { combineReducers } from 'redux'
import authReducer from './authReducer'
import taxReducer from './taxReducer'

const reducers = combineReducers({
    auth: authReducer,
    tax: taxReducer
})

export default reducers

export type State = ReturnType<typeof reducers>