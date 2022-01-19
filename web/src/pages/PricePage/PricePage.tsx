import { FC, useState } from "react";
import { useSelector } from "react-redux";
import DisplayPrice  from '../../components/DisplayPrice/DisplayPrice'
import Toggle  from '../../components/Shared/Toggle/Toggle'
import { State } from "../../store/reducers";
import styles from './PricePage.module.scss'
import { insuranceOfferDataGlobal, insuranceOfferDataUniversal } from "../../consts";


const PricePage : FC = (): JSX.Element => {
    const [checked, setChecked ] = useState(false)
    const [selected, setSelected ] = useState(false)
    const state = useSelector((state: State) => state.insurance)
    const { 
        globalPrice, 
        universalPrice, 
        yearlyGlobalPrice, 
        yearlyUniversalPrice,
    } = state['values']

    const toggleSwitch = () => {
        setChecked(!checked)
    }

    const chosePlan = () => {
        setSelected(!selected)
        console.log(selected)
    }


    return(
        <div className={styles.background + ' ' + styles.wrapper}>
            <h1 className={styles.heading}>Select a plan</h1>
            <Toggle 
                checked = {checked}
                onChange = {toggleSwitch}
            />
            <div className={styles.display}>
                <DisplayPrice 
                    text = 'Global'
                    price = { checked ? yearlyGlobalPrice : globalPrice}
                    insuranceOfferData = {insuranceOfferDataGlobal}
                    selectedPlan =  {selected}
                    chosePlan={chosePlan}
                />
                <DisplayPrice
                    text = 'Universe' 
                    price =  {checked ? yearlyUniversalPrice : universalPrice}
                    insuranceOfferData = {insuranceOfferDataUniversal}
                    selectedPlan = {!selected}
                    chosePlan={chosePlan}
                    />
            </div>
        </div>
    )
}

export default PricePage
