import { FC } from "react";
import InsuranceForm  from '../../components/InsuranceForm/InsuranceForm'
import styles from './CalculateInsurance.module.scss'

interface Props {

}
const CalculateInsurance : FC<Props> = (props: Props): JSX.Element => {
    return(
    <div className={styles.wrapper}>
        <InsuranceForm />
    </div>
    )
}

export default CalculateInsurance
