import { ValidateInsuranceFormErr } from "../../types/ValidateInsuranceFormErr"
import { emptyAgeErrorMessage, emptyPriceErrorMessage } from '../../consts'

export const validateInsuranceForm = (age: string, price: string): ValidateInsuranceFormErr => {
    let errorMessage: ValidateInsuranceFormErr = {
        isValid: true,
        ageMsg: '',
        priceMsg: ''
    }
    if(!age) {
        errorMessage.ageMsg = emptyAgeErrorMessage
        errorMessage.isValid = false
    }
    
    if(!price) {
        errorMessage.priceMsg = emptyPriceErrorMessage
        errorMessage.isValid = false
    }
    return errorMessage
}

