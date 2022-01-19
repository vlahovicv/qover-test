import { FC, useEffect, useMemo, useState } from "react";
import Button from "../Shared/Button/Button";
import TextField from "../Shared/TextField/TextField";
import { useDispatch, useSelector,  } from 'react-redux'
import { bindActionCreators } from "redux";
import { calculateInsurance } from '../../store/action-creators'
import Select from "../Shared/Select/Select";
import { State } from "../../store/reducers";
import styles from './InsuranceForm.module.scss'
import axiosClient from "../../apis/api";
import { validateInsuranceForm } from '../../utils/validate/validateInsuranceForm'


const InsuranceForm : FC = (): JSX.Element => {
    const [carValues, setCarValues ] = useState([])
    const [age, setAge] = useState('')
    const [ageMessage, setAgeMessage] = useState('')
    const [car, setCar] = useState('Bmw') 
    const [price, setPrice] = useState('')
    const [priceMessage, setPriceMessage] = useState('') 

    const dispatch = useDispatch()
    const insuranceActionCreator  = bindActionCreators(calculateInsurance, dispatch)
    const state = useSelector((state: State) => state.insurance)
    const insuranceState = state['values']

    useEffect(() => {
        if(insuranceState.message){
            switch(insuranceState.reason) {
                case 'age':
                    setAgeMessage(insuranceState.message)
                    break
                case 'price':
                    setPriceMessage(insuranceState.message)
                    break
                case 'young-porsche':
                    setAgeMessage(insuranceState.message)
                    break
            }
        }
    }, [insuranceState])

    useMemo(() => {
    axiosClient.get('/cars').then((response) =>{
            setCarValues(response.data)
        })
    }, []);
    
    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault()
        const cartest = carValues.find( e => e.type === car)
        const id = cartest.id
        const validateFormFields = validateInsuranceForm(age, price)
        if (!validateFormFields.isValid) {
            setAgeMessage(validateFormFields.ageMsg)
            setPriceMessage(validateFormFields.priceMsg)
            return
        }
        setAgeMessage('')
        setPriceMessage('')
        insuranceActionCreator(id, age, car, price)
    }

    return(
        <div>
            <form onSubmit={submitForm} className={styles.wrapper} >
                <TextField
                    type = 'number'
                    variant = 'calculate'
                    text ='Age of the driver'
                    value = {age}
                    errorMsg = {ageMessage}
                    onChange={(e) => setAge(e.target.value)}
                />
                <Select 
                    text = 'Car'
                    options = {carValues}
                    onChange={(e) => setCar(e.target.value)} 
                />
                <TextField
                    type = 'number'
                    variant = 'calculate'
                    text = 'Purchase Price'
                    value = {price}
                    errorMsg = {priceMessage}
                    onChange={(e) => setPrice(e.target.value)}
                />
                    <Button 
                        text = 'Get a Price'
                        icon = {false} 
                        variant = 'calculate'
                        />
            </form>
        </div>
    )
}

export default InsuranceForm
