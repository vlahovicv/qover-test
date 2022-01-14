import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/car.schema';
import { isUserCompetentMiddleware } from './middlewares/isUserCompetent.middleware';
import { CarController } from './car.controller';
import { CarService } from './car.service'
import { CarRepository } from './car.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Car.name,
        schema: CarSchema,
      },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService, CarRepository],
})
export class CarModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isUserCompetentMiddleware)
      .forRoutes('/api/calculate');
  }
}