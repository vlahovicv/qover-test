import { IsNotEmpty } from 'class-validator';

export class CarDataDto {
    @IsNotEmpty()
    id: string

    @IsNotEmpty({ message: "Age field is required" })
    age: number

    @IsNotEmpty({ message: "Type field is required" })
    type: string

    @IsNotEmpty({ message: "Price field is required" })
    price: number
  }