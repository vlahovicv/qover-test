import { FC, MouseEventHandler } from "react";
import styles from './Button.module.scss'

interface Props {
    text: string,
    icon: boolean, 
    variant: string
    submitForm: MouseEventHandler
}

const Button: FC<Props> = ({
  text,
  icon, 
  variant,
  submitForm
}): JSX.Element => {
  
    return (
      <div >
        {icon ? <i className='asd'/> : ''}
        <button type='submit' className={styles.button} onClick={submitForm}>
          {text}
        </button>
      </div>
    );
  }

  export default Button