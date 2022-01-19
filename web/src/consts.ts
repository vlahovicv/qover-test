import { InsuranceOfferData } from "./types/InsuranceOfferData"

export const emptyEmailErrorMessage = 'Email should not be empty'
export const invalidEmailErrorMessage = 'Please provide valid email address'
export const emptyPasswordErrorMessage = 'Password should not be empty'
export const emptyAgeErrorMessage = 'Age should not be empty'
export const emptyPriceErrorMessage = 'Price should not be empty'

export const insuranceOfferDataGlobal: InsuranceOfferData = {
    maxTravelDuration: 90,
    medicalExpenses: 1000000,
    personalAssistance: 5000,
    travelAssistance: 5000,
    coverageDuraton: 1
}
export const insuranceOfferDataUniversal: InsuranceOfferData  ={
    maxTravelDuration: 180,
    medicalExpenses: 3000000,
    personalAssistance: 10000,
    travelAssistance: 2500,
    coverageDuraton: 1
}
    