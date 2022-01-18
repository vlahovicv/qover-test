import { ChangeEvent, FC } from "react";
import styles from './TextField.module.scss'

interface Props {
  type: string,
  value: string,
  variant: string
  icon: boolean,
  text: string
  errorMsg: string
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}

const TextField: React.FC<Props> = ({
  type,
  value,
  variant,
  icon,
  text,
  errorMsg,
  onChange }): JSX.Element => {
  
    return (
      <div className='asd'>
        {icon ? <i className='asd'/> : ''}
        <p className={styles.title}>{text}</p>
        <input className={styles.input} type={type} value={value} onChange={onChange}/>
        {errorMsg ?? <p className={styles.errorMsg}>{errorMsg}</p>}
      </div>
    );
  }


export default TextField