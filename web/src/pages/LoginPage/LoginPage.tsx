import { FC } from "react";
import LoginForm  from '../../components/LoginForm/LoginForm'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import styles from './LoginPage.module.scss';

interface Props {

}
const LoginPage : FC<Props> = (props: Props): JSX.Element => {
    return(
    <div className={styles.wrapper}>
        <div className={styles.logo}>
        <Logo />
        </div>
        <LoginForm />
        <div className={styles.rectangle}>
            <p className={styles.text}>Dont have an account? Ask access </p>
        </div>
    </div>
    )
}

export default LoginPage
