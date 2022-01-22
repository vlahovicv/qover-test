import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {

  id: string;
  
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  globalPrice: number;

  @Prop({ required: true })
  priceModifier: number;

}

export const CarSchema = SchemaFactory.createForClass(Car);