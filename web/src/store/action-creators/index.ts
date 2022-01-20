import { ActionType } from '../action-types';
import { Dispatch, AnyAction } from 'redux';
import axiosClient  from '../../apis/api';
import { Action } from '../actions/index';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';
import history from '../../history';

export const loginUser = (email: string, password: string, rememberMe: boolean = false): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
        axiosClient.post('/login', {email, password, rememberMe}).then((response) => {
            if(!response.data.msg) {
                localStorage.setItem('token', response.data.token);
                history.push('/calculate');
                dispatch({
                    type: ActionType.LOGIN_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: ActionType.LOGIN_ERROR,
                    payload: response.data
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: ActionType.LOGIN_ERROR,
                payload: error.response.data
            });
        }) 
    }
}

export const calculateInsurance = (id: string, age: string, type: string, price: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch: Dispatch<Action>) => {
        axiosClient.post('/calculate', {id, age, type, price}).then((response) =>{
            if(!response.data.message) {
                history.push('/price');
                dispatch({
                    type: ActionType.CALCULATE_SUCCESS,
                    payload: response.data
                });
            }
            else {
                dispatch({
                    type: ActionType.CALCULATE_ERROR,
                    payload: response.data
                });
            }
        })
        .catch((error) => {
            dispatch({
                type: ActionType.CALCULATE_ERROR,
                payload: error.response.data
            })
        }) 
    }
}
