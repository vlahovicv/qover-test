import { ValidateLoginFormErr } from "../../types/ValidateLoginFormErr";
import { emptyEmailErrorMessage, emptyPasswordErrorMessage, invalidEmailErrorMessage } from '../../consts';

export const validateLoginForm = (email: string, password: string): ValidateLoginFormErr => {
    let errorMessage: ValidateLoginFormErr = {
        isValid: true,
        emailMsg: '',
        passwordMsg: ''
    };
    if(!email) {
        errorMessage.emailMsg = emptyEmailErrorMessage;
        errorMessage.isValid = false;
    }
    if(!RegExp(/^\S+@\S+\.\S+$/).test(email)) {
        errorMessage.emailMsg = invalidEmailErrorMessage;
        errorMessage.isValid = false;
    }
    if(!password) {
        errorMessage.passwordMsg = emptyPasswordErrorMessage;
        errorMessage.isValid = false;
    }
    return errorMessage;
}

