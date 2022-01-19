import { CardStyles } from "../../types/CardStyles"

export const cardStyles = (selectedPlan: boolean): CardStyles => {
    let selected: string = ''
    let wrapper: string = 'notSelected'
    if(selectedPlan) {
        selected = 'Selected'
        wrapper = 'selected'
    }
    return {
        wrapper,
        textStyle : `mainText${selected}`,
        priceStyle : `price${selected}`,
        field : `field${selected}`,
        priceWrapper: `priceWrapper${selected}`,
        euroSign: `euroSign${selected}`,
        priceTextDescription: `priceTextDescription${selected}`,
        buttonText : selectedPlan ? 'Plan Selected' : 'Choose this plan',
        icon : selectedPlan ? true : false,
        variant : selectedPlan ? 'planV1' : 'planV2',
    }
} 