import { InsuranceOfferData } from "../../types/InsuranceOfferData";

export const generateInsuranceData = (insuranceOfferData: InsuranceOfferData) => {
    return [
        `Maximum duration travel of ${insuranceOfferData.maxTravelDuration}`,
        `Medical expenses reimbursement up to ${insuranceOfferData.medicalExpenses}`,
        `Personal assistance aboard up to ${insuranceOfferData.personalAssistance}`,
        `Travel assistance aboard up to ${insuranceOfferData.travelAssistance}`,
        `Coverage duration: ${insuranceOfferData.coverageDuraton} year`
    ];
}