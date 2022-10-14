import { DocumentType } from '@typegoose/typegoose';
import { CityEntity } from './cities.entity.js';
import CreateFeatureDTO from './dto/create-cities.dto.js';

export interface CitiesDBServiceInterface {
  create(cityDTO: CreateFeatureDTO): Promise<DocumentType<CityEntity>>;
  getByName(cityName: string): Promise<DocumentType<CityEntity> | null>;
  getById(cityId: string): Promise<DocumentType<CityEntity> | null>;
  findOrCreate(cityDTO: CreateFeatureDTO): Promise<DocumentType<CityEntity>>;
}
