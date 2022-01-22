import { carDataDtoStub, getCarDbValuesStub, } from '../stub/carData';
import { CarRepository } from 'src/car/car.repository';
import { isUserCompetentMiddleware } from '../../src/car/middlewares/isUserCompetent.middleware';
import { MockModel } from '__tests__/util/mock.modlel';
import { Car } from 'src/car/schemas/car.schema';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';


class MockCarModel extends MockModel<Car>(getCarDbValuesStub()) {}

describe('Is user competent middleware', () => {
  let carRepository: CarRepository;
  let res: any = {}
  let req: any = {}
  let spy
    res.json = jest.fn()
  

  beforeEach(async () => {
    spy = jest.fn()
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        CarRepository,
        {
          provide: getModelToken(Car.name),
          useValue: MockCarModel,
        },
      ],
    }).compile();
    carRepository = module.get<CarRepository>(CarRepository);
    jest.clearAllMocks();
  });
  

  it('Should call next function', async () => {
    const middleware = new isUserCompetentMiddleware(carRepository)
    req.body = carDataDtoStub()
    await middleware.use(req, res, spy)

    expect(spy).toHaveBeenCalled();
  });

  it('Should not call next function', async () => {
    const middleware = new isUserCompetentMiddleware(carRepository)
    req.body = carDataDtoStub({
        age: 10
    })
    await middleware.use(req, res, spy)
    expect(spy).not.toHaveBeenCalled();
  });

  it('Should not call next function', async () => {
    const middleware = new isUserCompetentMiddleware(carRepository)
    req.body = carDataDtoStub({
        price: 1000
    })
    await middleware.use(req, res, spy)
    expect(spy).not.toHaveBeenCalled();
  });
});