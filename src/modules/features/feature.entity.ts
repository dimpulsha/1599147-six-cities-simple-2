import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { Feature } from '../../types/feature.type.js';

const { prop, modelOptions } = typegoose;

export interface FeatureEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'features'
  }
})

export class FeatureEntity extends defaultClasses.TimeStamps implements Feature {
@prop({required: true, trim: true})
  public name!: string;

}

export const FeatureModel = getModelForClass(FeatureEntity);
