import { FC, MouseEventHandler } from "react";
import Button from "../Shared/Button/Button";
import styles from './DisplayPrice.module.scss'
import { InsuranceOfferData } from '../../types/InsuranceOfferData'
import { cardStyles } from '../../utils/styles/generateCardStyles'
import DisplayPriceField from "./DisplayPriceField/DisplayPriceField";

interface Props {
    text: string,
    price: number,
    insuranceOfferData: InsuranceOfferData,
    selectedPlan: boolean,
    chosePlan: MouseEventHandler
};
const DisplayPrice : FC<Props> = ({
    text,
    price,
    insuranceOfferData,
    chosePlan,
    selectedPlan 
}): JSX.Element => {

    const { 
        wrapper, 
        textStyle, 
        priceStyle, 
        buttonText, 
        icon, 
        variant,
        field,
        priceWrapper,
        euroSign,
        priceTextDescription
    } = cardStyles(selectedPlan);
    
    return(
        <div className={styles[wrapper] + ' ' + styles.priceCard}>
            <h2 className={styles[textStyle]}>{text}</h2>
           <hr className={styles.line}></hr>
            <div className={styles[priceWrapper]}>
                <div className={styles.priceWithSign}>
                    <h1 className={styles[priceStyle]}>{price}</h1>
                    <span className={styles[euroSign]}>€</span>
                </div>
                <p className={styles[priceTextDescription]}>YEARLY INCL. TAXES</p>
            </div>
            <hr className={styles.line}></hr>
            <DisplayPriceField 
                fieldStyle = {field}
                insuranceOfferData = {insuranceOfferData}
            />       
            <Button 
                    text = {buttonText}
                    icon = {icon}
                    variant = {variant}
                    onClick={selectedPlan ? null  : chosePlan }
                    />
        </div>
    )
}

export default DisplayPrice;
