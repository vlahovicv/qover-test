interface loginUser {
    type: string
    payload?: object
}

interface calculateInsurance {
    type: string
    payload: object
}

export type Action = loginUser | calculateInsurance;