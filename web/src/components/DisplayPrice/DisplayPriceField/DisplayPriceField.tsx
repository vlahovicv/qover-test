import { FC } from "react"
import { InsuranceOfferData } from "../../../types/InsuranceOfferData"
import styles from './DisplayPriceField.module.scss'
import { generateInsuranceData } from '../../../utils/data/generateInsuranceData'

interface Props {
    fieldStyle: string
    insuranceOfferData: InsuranceOfferData

}
const DisplayPriceField : FC<Props> = ({
    fieldStyle,
    insuranceOfferData
}): JSX.Element => {

    const generatedData = generateInsuranceData(insuranceOfferData)

    const getAllData = (generatedData) => {
        return generatedData.map((value, index) => {
            let field = (
            <div key={index}>
                <p className={styles[fieldStyle]}>
                    {value}
                </p>
                <hr className={styles.line}></hr>
            </div>
            )
            return field
        })
    }
    
    return( 
        <div>
           {getAllData(generatedData)}
        </div>
    );
}


export default DisplayPriceField