import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import {RESTAppComponent} from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { CitiesDBServiceInterface } from './cities-service.interface.js';
import { CityEntity } from './cities.entity.js';
import CreateCitiesDTO from './dto/create-cities.dto.js';

@injectable()
export default class CitiesDBService implements CitiesDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CityModel) private readonly cityModel: ModelType<CityEntity>
  ) {}

  public async create(cityDTO: CreateCitiesDTO): Promise<DocumentType<CityEntity>> {
    const createResult = await this.cityModel.create(cityDTO);
    this.logger.info(`New city ${CreateCitiesDTO.name} created`);
    return createResult;
  }

  public async getByName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return await this.cityModel.findOne({ name: cityName });
  }

  public async getById(cityId: string): Promise<DocumentType<CityEntity> | null> {
    return await this.cityModel.findById(cityId);
  }

  public async findOrCreate(cityDTO: CreateCitiesDTO): Promise<DocumentType<CityEntity>> {
    const existCity = await this.getByName(cityDTO.name);
    if (existCity) { return existCity; }
    return this.create(cityDTO);
  }

  public async getIdByName(cityName: string): Promise<string | null> {
    const result = await this.getByName(cityName);
    if (!result) {
      return null;
    }
    return (String(result?._id));
  }
}
