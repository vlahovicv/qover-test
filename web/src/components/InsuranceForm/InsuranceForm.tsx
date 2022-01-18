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

interface Props {

}

const InsuranceForm : FC<Props> = (props: Props): JSX.Element => {
    const [carValues, setCarValues ] = useState([])
    const [age, setAge] = useState('')
    const [ageMessage, setAgeMessage] = useState('')
    const [car, setCar] = useState('') 
    const [price, setPrice] = useState('')
    const [priceMessage, setPriceMessage] = useState('') 

    const dispatch = useDispatch()
    const insuranceActionCreator  = bindActionCreators(calculateInsurance, dispatch)
    const state = useSelector((state: State) => state.tax)
    const insuranceState = state['values']

    useEffect(() => {
        console.log(insuranceState)
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
    
    const submitForm = (event) => {
        const formData = getFormValues(event) 
        const { id, age, type, price } = formData
        const validateFormFields = validateInsuranceForm(age, price)
         if (!validateFormFields.isValid) {
            setAgeMessage(validateFormFields.ageMsg)
            setPriceMessage(validateFormFields.priceMsg)
             return
         }
        setAgeMessage('')
        setPriceMessage('')
        insuranceActionCreator(id, age, type, price)
    }
    const getFormValues = (e) => {
        e.preventDefault()
        let formValues: string[] = []
        for(let i = 0; i < e.target.length - 2; i++) {
            formValues.push(e.target[i].value)
        }
        const car = carValues.find( e => e.type === formValues[1])
        const formData = {
            id : car.id,
            age : formValues[0],
            type: formValues[1],
            price: formValues[2]
        }
        return formData
    }
    return(
        <div>
            <form onSubmit={submitForm} className={styles.wrapper}>
                <TextField
                    type = 'text'
                    variant = '1'
                    icon = {false}
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
                    type = 'text'
                    variant = ''
                    icon = {true}
                    text = 'Purchase Price'
                    value = {price}
                    errorMsg = {priceMessage}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br/>
                <input type="submit" value="Submit" />
                <Button 
                    text = 'test'
                    icon = {false} 
                    variant = ''
                    submitForm={(e) => e.preventDefault()}
                    />
            </form>
        </div>
    )
}

export default InsuranceForm
