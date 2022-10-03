import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { FeatureDBServiceInterface } from './feature-service.interface.js';
import {RESTAppComponent} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import { FeatureEntity } from './feature.entity.js';
import CreateFeatureDTO from './dto/create-features.dto.js';

@injectable()
export default class FeatureDBService implements FeatureDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.FeatureModel) private readonly featureModel: ModelType<FeatureEntity>,
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
  ) { }

  public async create(featureDTO: CreateFeatureDTO): Promise<DocumentType<FeatureEntity>> {
    const createResult = await this.featureModel.create(featureDTO);
    this.logger.info(`New feature ${featureDTO.name} created`);

    return createResult;

  }

  public async getById(featureId: string): Promise<DocumentType<FeatureEntity> | null> {

    return this.featureModel.findById(featureId).exec();
  }

  public async getByName(featureName: string): Promise<DocumentType<FeatureEntity> | null> {

    return this.featureModel.findOne({ name: featureName }).exec();
  }

  public async findOrCreate(featureName: string, featureDTO: CreateFeatureDTO): Promise<DocumentType<FeatureEntity>> {

    const result = await this.getByName(featureName);
    if (result) { return result; }

    return this.create(featureDTO);
  }

}

