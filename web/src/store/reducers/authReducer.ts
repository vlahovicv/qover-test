import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState = {
    loading: false,
    error: '',
    userInfo: { email: '', token: '', message: ''}
}
type UserInfo = {
    email?: string, token?: string, message?: string
}
interface UserState {
    error?: string,
    userInfo: UserInfo
}

const authReducer = (state: UserState = initialState, action: Action) => {
    switch(action.type) {
        case ActionType.LOGIN_REQUEST:
            return {loading: true};
        case ActionType.LOGIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case ActionType.USER_LOGOUT:
            return {};
        case ActionType.LOGIN_ERROR:
            return {loading: false, userInfo: action.payload};
        default:
            return state;
    }
}

export default authReducer;