import { Test } from '@nestjs/testing';
import { CarService } from 'src/car/car.service';
import { CarController } from 'src/car/car.controller';
import { calculatedPricesStub, carDataDtoStub, getCarDbValuesStub, getCarStub, } from '../stub/carData';
import { CarRepository } from 'src/car/car.repository';
import { getModelToken } from '@nestjs/mongoose';
import { Car } from 'src/car/schemas/car.schema';
import { MockModel } from '__tests__/util/mock.modlel';

class MockCarModel extends MockModel<Car>(getCarDbValuesStub()) {}

describe('CarController', () => {
  let carController: CarController;
  let carService: CarService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [CarController],
      providers: [
        CarService, 
        CarRepository,
        {
          provide: getModelToken(Car.name),
          useValue: MockCarModel,
        },
      ],
    }).compile();

    carController = module.get<CarController>(CarController);
    carService = module.get<CarService>(CarService);
  });

  it('should return all cars', async () => {
    const res = await carController.getCars();

    expect(res).toEqual([getCarStub()]);
  });

  it('should return calculated prices', async () => {
    const data = carDataDtoStub();
    const res = await carController.calculatePrice(data);

    expect(res).toEqual(calculatedPricesStub());
  });
});