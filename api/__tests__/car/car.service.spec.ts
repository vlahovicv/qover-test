import { calculatedPricesStub, carDataDtoStub, getCarDbValuesStub, partialCarDbValues } from '../stub/carData';
import { CarService } from 'src/car/car.service';
import { Test } from '@nestjs/testing';
import { CarRepository } from 'src/car/car.repository';
import { MockModel } from '__tests__/util/mock.modlel';
import { Car } from 'src/car/schemas/car.schema';
import { getModelToken } from '@nestjs/mongoose';

class MockCarModel extends MockModel<Car>(getCarDbValuesStub()) {}
describe('CarService', () => {
  let carService: CarService;
  let carRepository: CarRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CarService,
        CarRepository,
        {
          provide: getModelToken(Car.name),
          useValue: MockCarModel,
        },
      ],
    }).compile();

    carService = module.get<CarService>(CarService);
    carRepository = module.get<CarRepository>(CarRepository);
    jest.clearAllMocks();
  });

  it('Should return all cars', async () => {
    const expected = partialCarDbValues();
    
    const res = await carService.getCars();
    
    expect(res).toEqual([expected]);
  });

  it('Should return insurance offer for car', async () => {
    const data = carDataDtoStub();
    const res = await carService.getPrice(data);

    expect(res).toEqual(calculatedPricesStub());
  });
});