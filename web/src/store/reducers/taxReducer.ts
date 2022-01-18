import { ActionType } from "../action-types"
import { Action } from "../actions"

const initialState = {
    values: {
        globalPrice: 0,
        universalPrice: 0
    }
}


const taxReducer = (state: object = initialState, action: Action) => {
    switch(action.type) {
        case ActionType.CALCULATE_SUCCESS:
            return {...state, values: action.payload }
        case ActionType.CALCULATE_ERROR:
            return {...state, values: action.payload }
        default:
            return state
    }
}

export default taxReducer