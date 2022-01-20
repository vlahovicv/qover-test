import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Car, CarDocument } from "./schemas/car.schema";
import { CarValues } from "./types/CarValues";

@Injectable()
export class CarRepository {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

    async getCars(): Promise<CarValues[]> {
        const cars = await this.carModel.find().exec();
        const values: CarValues[] = cars.map((car) => {
          return {
            id : car.id,
            type : car.type
          };
        });
        return values;
    }

    async getCar(id: string): Promise<Car> {
      return this.carModel.findOne({_id: id}).exec();
  }
}