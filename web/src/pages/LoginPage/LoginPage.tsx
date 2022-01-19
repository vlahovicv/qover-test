import { FC } from "react";
import LoginForm  from '../../components/LoginForm/LoginForm'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import styles from './LoginPage.module.scss';


const LoginPage : FC = (): JSX.Element => {
    return(
    <div className={styles.wrapper}>
        <div className={styles.logo}>
        <Logo />
        </div>
        <LoginForm />
        <div className={styles.rectangle}>
            <p className={styles.text}>Dont have an account? Ask access </p>
        </div>
        <hr className={styles.footerLine}></hr>
        <footer className={styles.footer}>© Qover 2017</footer>
    </div>
    )
}

export default LoginPage
