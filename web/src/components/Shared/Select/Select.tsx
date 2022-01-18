import { FC } from "react";
import { CarData } from '../../../types/CarData'

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

    let values
    if(options) {
       values = options.map((option) => {
          let opt = <option key={option.id} value={option.type}>
            {option.type}
          </option>
          return opt
      })
    }
    return (
      <div className='asd'>
        <p>{text}</p>
        <select onChange={onChange}>
            {values}
        </select>
      </div>
    );
  }

  export default Select