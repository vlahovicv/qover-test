import { FC, useState } from "react";
import { useSelector,  } from 'react-redux'
import { State } from "../../store/reducers";

interface Props {

}
const DisplayPrice : FC<Props> = (props: Props): JSX.Element => {

    const state = useSelector((state: State) => state.tax)
    const calculatedTax = state['values']

    // const onClick = (e) => {
    //     e.preventDefault()
    // }
    return(
        <div>
            <h2>Global</h2>
            <h1>{calculatedTax.globalPrice}</h1>
            <br></br>
            <h2>Universal</h2>
            <h1>{calculatedTax.universalPrice}</h1>
        </div>
        
    )
}

export default DisplayPrice
