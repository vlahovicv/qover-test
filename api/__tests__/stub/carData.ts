import { CarDataDto } from 'src/car/dto/car-data.dto';
import { Car } from 'src/car/schemas/car.schema';
import { CarValues } from 'src/car/types/CarValues';

export const calculatePriceMock = () => 6000;

export const getCarStub = (): CarValues => ({
  id: '61e13702a1cfddc176091104',
  type: 'BMW'
});

export const getCarDbValuesStub = (): Car => ({
  id: '61e13702a1cfddc176091104',
  type: 'BMW',
  globalPrice: 150,
  priceModifier: 0.004,
});

export const partialCarDbValues = (): Partial<Car> => ({
  id: '61e13702a1cfddc176091104',
  type: 'BMW'
});

export const calculatedPricesStub = (): Prices => ({
  globalPrice : 150,
  universalPrice: 170,
  yearlyGlobalPrice: 1800,
  yearlyUniversalPrice: 2040,
})

  export const carDataDtoStub = (
    values?: Partial<CarDataDto>,
   ): CarDataDto  => ({
      id: '61e13702a1cfddc176091104',
      age: 18,
      type: 'BMW',
      price: 5000,
      ...values
    })
