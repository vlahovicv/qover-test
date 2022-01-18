import { FC, useEffect, useState } from "react";
import Button from "../Shared/Button/Button";
import TextField from "../Shared/TextField/TextField";
import { useDispatch, useSelector,  } from 'react-redux'
import { bindActionCreators } from "redux";
import { loginUser } from '../../store/action-creators'
import styles from './LoginForm.module.scss';
import { ReactComponent as Icon } from '../../assets/svg/checked-no-label.svg';
import CheckBox from "../Shared/CheckBox/CheckBox";
import { validateLoginForm } from '../../utils/validate/validateLoginForm'
import { State } from "../../store/reducers";
//interface state
interface Props {

}

const LoginForm : FC<Props> = (props: Props): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberUser, setRememberUser] = useState(false)
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')  

    const dispatch = useDispatch()
    const authActionCreator  = bindActionCreators(loginUser, dispatch)
    const state = useSelector((state: State) => state.auth)

    useEffect(() => {
        if(state.userInfo['statusCode'] === 400) {
            setPasswordMessage(state.userInfo['message'])
        }
    
        if(state.userInfo['statusCode'] === 404) {
            setEmailMessage(state.userInfo['message'])
        }
    },[state])

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault()
        
        const validateFormFields = validateLoginForm(email, password)
         if (!validateFormFields.isValid) {
             setEmailMessage(validateFormFields.emailMsg)
             setPasswordMessage(validateFormFields.passwordMsg)
             return
         }
        setEmailMessage('')
        setPasswordMessage('') 
        authActionCreator(email, password, rememberUser)
    }

    return(
        <div>
            <form className={styles.form}>
                <p className={styles.mainText}>Welcome at Qover</p>
                <TextField
                    type = 'email'
                    variant = ''
                    icon = {false}
                    text ='Email'
                    value = {email}
                    errorMsg = {emailMessage}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <TextField
                    type = 'password'
                    variant = ''
                    icon = {false}
                    text = 'Password'
                    value = {password}
                    errorMsg = {passwordMessage}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className={styles.test}>
                    <Icon className={styles.icon}/>
                    <CheckBox 
                    label='Remember Me'
                    rememberMe={(e) => setRememberUser(true)} 
                    />
                    <a className={styles.passwordText} href='#'>Forgot your password?</a>
                </div>
                <Button 
                    text = 'Sign in to your account'
                    icon = {false} 
                    variant = ''
                    submitForm={(e) => submitForm(e)}
                    />
            </form>
        </div>
    )
}

export default LoginForm
