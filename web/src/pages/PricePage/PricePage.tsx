import { FC } from "react";
import DisplayPrice  from '../../components/DisplayPrice/DisplayPrice'

interface Props {

}
const PricePage : FC<Props> = (props: Props): JSX.Element => {
    return(
    <div>
        <DisplayPrice />
    </div>
    )
}

export default PricePage
