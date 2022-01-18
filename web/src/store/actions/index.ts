import { ActionType } from '../action-types'

interface loginUser {
    type: string
    payload?: object
}

interface calculateTax {
    type: string
    payload: object
}

export type Action = loginUser | calculateTax