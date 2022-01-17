//Open possibility to put all this data in database
export enum RejectMessage {
    YOUNG_DRIVER = "Sorry! The driver is too young",
    LOW_PRICE = "Sorry! The price of the car is too low",
    YOUNG_PORSCHE_DRIVER = "Sorry! We can not accept this particular risk"
}

export enum Requirements {
    MINIMUM_AGE = 18,
    MINIMUM_PRICE = 5000,
    CAR_WITH_AGE_RESTRICTION = 'Porsche',
    MINIMUM_AGE_PORSCHE = 25
}