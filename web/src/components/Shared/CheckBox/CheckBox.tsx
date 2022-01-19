import { FC, MouseEventHandler } from "react";
import styles from './CheckBox.module.scss'
import { ReactComponent as Icon } from '../../../assets/svg/checked-no-label.svg';


interface Props {
    label: string,
    rememberMe: MouseEventHandler
    rememberUser: boolean,
}

const CheckBox: FC<Props> = ({
  label,
  rememberMe,
  rememberUser
  }): JSX.Element => {
    return (
        <div className={styles.wrapper} onClick={rememberMe}>
            {rememberUser ? 
            <Icon className={styles.icon}/> 
            : <div className={styles.notChecked}></div>}
            <input type="checkbox" className={styles.checkBox} name="Remember me" />
            <label className={styles.label}>{label}</label>
        </div>
    );
  }

export default CheckBox