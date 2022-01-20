import { FC } from "react";
import styles from './Toggle.module.scss';

interface Props {
     checked: boolean,
     onChange
}

const Toggle: FC<Props> = ({
   checked,
   onChange
}): JSX.Element => {

    return (
        <div className={styles.wrapper}>
        <p className={styles.toggleText}>Pay monthly</p>
        <label className={styles.switch}>
            <input type="checkbox"  defaultChecked={checked} onChange={onChange}/>
            <span className={`${styles.slider} ${styles.round}`} />
        </label>
        <p className={styles.toggleText}>Pay yearly</p>

    </div>
    );
  }

  export default Toggle;