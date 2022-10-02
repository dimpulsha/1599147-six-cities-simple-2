import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import {RESTAppComponent} from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { OfferDBServiceInterface } from './offer-service.interface.js';


@injectable()
export default class OfferDBService implements OfferDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.OfferModel) private readonly offerModel: ModelType<OfferEntity>,
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) { }

  public async create(offerDTO: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const createResult = await this.offerModel.create(offerDTO);
    this.logger.info(`New offer created ${offerDTO.offerTitle}`);
    return createResult;
  }

  public getById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();

  }

}
