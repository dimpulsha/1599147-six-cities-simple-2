import { DocumentType } from '@typegoose/typegoose';
import { FeatureEntity } from './feature.entity';
import CreateFeatureDTO from './dto/create-features.dto';

export interface FeatureDBServiceInterface {
  create(featureDTO: CreateFeatureDTO): Promise<DocumentType<FeatureEntity>>;
  getByName(featureName: string): Promise<DocumentType<FeatureEntity> | null>;
  getById(featureId: string): Promise<DocumentType<FeatureEntity> | null>;
  findOrCreate(featureName: string, featureDTO: CreateFeatureDTO): Promise<DocumentType<FeatureEntity>>;
  getIdByName(featureName: string): Promise<string | null>;
}
