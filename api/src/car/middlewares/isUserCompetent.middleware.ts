import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CarRepository } from '../car.repository';
import { RejectMessage, Requirements } from '../enums/InsuranceRequirements';
import { Car } from '../schemas/car.schema';

@Injectable()
export class isUserCompetentMiddleware implements NestMiddleware {
    constructor(
        private readonly carRepository: CarRepository
    ){}
    async use(req: Request, res: Response, next: NextFunction) {
        const { age, price, id } = req.body
        const carData: Car = await this.carRepository.getCar(id)
        if(age < Requirements.MINIMUM_AGE) {
            return res.json({
                message: RejectMessage.YOUNG_DRIVER,
                reason: 'age'
            });
        }
        if(price < Requirements.MINIMUM_PRICE) {
            return res.json({
                message: RejectMessage.LOW_PRICE,
                reason: 'price'
            });
        }
        if(age < Requirements.MINIMUM_AGE_PORSCHE && carData.type === Requirements.CAR_WITH_AGE_RESTRICTION) {
            return res.json({
                message: RejectMessage.YOUNG_PORSCHE_DRIVER,
                reason: 'young-porsche'
            });
        }
        next();
    }
}