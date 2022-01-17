import { Injectable } from '@nestjs/common';
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

    async getPrice(carDataDto: CarDataDto): Promise<Prices> {
        const { id, price } = carDataDto
        const car = await this.carRepository.getCar(id)
        return this.calculatePrice(car, price)
    }

    private calculatePrice = (car: Car, price: number): Prices => {
        const universalPrice = car.globalPrice +  price * car.priceModifier
        const yearlyGlobalPrice = car.globalPrice * 12
        const yearlyUniversalPrice = universalPrice * 12

        return {
            globalPrice : car.globalPrice,
            universalPrice,
            yearlyGlobalPrice, 
            yearlyUniversalPrice 
        }
    }
}
