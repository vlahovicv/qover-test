import { ChangeEvent, FC, MouseEventHandler } from "react";
import styles from './CheckBox.module.scss'

interface Props {
    label: string,
    rememberMe: MouseEventHandler
}

const CheckBox: FC<Props> = ({
  label,
  rememberMe
  }): JSX.Element => {
  
    return (
        <div className={styles.label}>
            <input type="checkbox" className="" name="Remember me" onClick={rememberMe}/>
            <label>{label}</label>
        </div>
    );
  }

export default CheckBox