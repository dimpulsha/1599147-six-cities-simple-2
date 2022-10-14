import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { City } from '../../types/city.type.js';

const { prop, modelOptions } = typegoose;

export interface CityEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'cities'
  }
})

export class CityEntity extends defaultClasses.TimeStamps implements City {
@prop({required: true, trim: true})
  public name!: string;

@prop({required: true, trim: true})
public latitude!: number;

@prop({required: true, trim: true})
public longitude!: number;
}

export const CityModel = getModelForClass(CityEntity);
