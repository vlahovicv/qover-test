import { FC } from "react";
import { CarData } from '../../../types/CarData';
import styles from './Select.module.scss';

interface Props {
    text: string,
    options: CarData[],
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>,
      ) => void;
}

const Select: FC<Props> = ({
    text,
    options,
    onChange
    }): JSX.Element => {

    let values;
    if(options) {
       values = options.map((option) => {
          let opt = <option key={option.id} value={option.type} >
            {option.type}
          </option>
          return opt;
      })
    }
    return (
      <div className={styles.wrapper}>
        <p className={styles.label}>{text}</p>
        <select onChange={onChange} className={styles.calculate}>
            {values}
        </select>
      </div>
    );
  }

  export default Select;