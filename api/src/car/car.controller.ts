import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDataDto } from './dto/car-data.dto';
import { CarValues } from './types/CarValues';
import { AuthGuardJwt } from '../auth/jwt/auth-guard.jwt';

@Controller('/api')
export class CarController {
    constructor(
        private carService: CarService,
    ) {}
    @UseGuards(AuthGuardJwt)
    @Get('/cars')
    async getCars(
    ): Promise<CarValues[]> {
      return this.carService.getCars();
    }

    @UseGuards(AuthGuardJwt)
    @Post('/calculate')
    async calculatePrice(
      @Body() carDataDto: CarDataDto,
    ): Promise<Prices> {
      return this.carService.getPrice(carDataDto);
    }
}