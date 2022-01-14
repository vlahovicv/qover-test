import { BadRequestException, Injectable } from '@nestjs/common';
//import Car, { createCar }  from './car';
import { CarDataDto } from './dto/car-data.dto'
import { CarRepository } from './car.repository';
import { CarValues } from './types/CarValues';
import { Car } from './schemas/car.schema';

@Injectable()
export class CarService {
    constructor(
        private readonly carRepository: CarRepository
    ){}
    
    async getCars(): Promise<CarValues[]> {
        return await this.carRepository.getCars()
    }

    async calculatePrice(carDataDto: CarDataDto): Promise<Prices> {
        const { id, price } = carDataDto
        const car = await this.carRepository.getCar(id)


        return this.calcPrice(car, price)
    }

    private calcPrice = (car: Car, price: number): Prices => {
        const universalPrice = car.globalPrice +  price * car.priceModifier
        const yearlyGlobalPrice = car.globalPrice * 12
        const yearlyUniversalPrice = car.globalPrice * 12

        return {
            globalPrice : car.globalPrice,
            universalPrice,
            yearlyGlobalPrice, 
            yearlyUniversalPrice 
        }
    }


    //private calcPrice(car, price): Prices {
        // const specificCar: Car = createCar(car)
        // specificCar.calculatePrice(price);

        // return {
    //         globalPrice : specificCar.globalPrice,
    //         universalPrice : specificCar.universalPrice ,
    //         yearlyGlobalPrice : specificCar.yearlyGlobalPrice,
    //         yearlyUniversalPrice : specificCar.yearlyUniversalPrice
    //     }
    // }
    
}
