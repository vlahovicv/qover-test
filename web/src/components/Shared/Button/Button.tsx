import { FC, MouseEventHandler } from "react";
import styles from './Button.module.scss'
import { ReactComponent as Icon } from '../../../assets/svg/valid.svg'

interface Props {
    text: string,
    icon: boolean, 
    variant: string,
    onClick?: MouseEventHandler
}

const Button: FC<Props> = ({
  text,
  icon, 
  variant,
  onClick
}): JSX.Element => {

    return (
      <div className={styles.wrapper}>
        <button type='submit' className={styles[variant]} onClick={onClick}>
          {icon ? <Icon className={styles.icon}/> : null}
          {text}
        </button>
      </div>
    );
  }

  export default Button