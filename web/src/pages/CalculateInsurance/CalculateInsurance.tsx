import { FC } from "react";
import InsuranceForm  from '../../components/InsuranceForm/InsuranceForm';
import styles from './CalculateInsurance.module.scss';


const CalculateInsurance : FC = (): JSX.Element => {
    return(
    <div className={styles.wrapper}>
        <div className={styles.color}>
            <InsuranceForm />
        </div>
    </div>
    )
}

export default CalculateInsurance;
