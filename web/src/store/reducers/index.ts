import { combineReducers } from 'redux'
import authReducer from './authReducer'
import insuranceReducer from './insuranceReducer'

const reducers = combineReducers({
    auth: authReducer,
    insurance: insuranceReducer
})

export default reducers

export type State = ReturnType<typeof reducers>