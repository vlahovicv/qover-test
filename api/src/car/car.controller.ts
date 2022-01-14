import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDataDto } from './dto/car-data.dto';
import { AuthGuardJwt } from 'src/auth/jwt/auth-guard.jwt';
import { CarValues } from './types/CarValues';
//import { AuthGuardJwt } from './jwt/auth-guard.jwt';

@Controller('/api')
export class CarController {
    constructor(
        private carService: CarService,
    ) {}
    //@UseGuards(AuthGuardJwt)
    @Get('/cars')
    async getCars(
    ): Promise<CarValues[]> {
      return this.carService.getCars();
    }

    //@UseGuards(AuthGuardJwt)
    @Post('/calculate')
    async calculatePrice(
      @Body() carDataDto: CarDataDto,
    ): Promise<Prices> {
      return this.carService.calculatePrice(carDataDto);
    }
}