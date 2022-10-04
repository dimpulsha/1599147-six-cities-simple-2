import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { DEFAULT_OFFER_COUNT } from '../../app.config.js';
import {RESTAppComponent} from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { OfferDBServiceInterface } from './offer-service.interface.js';
import UpdateOfferDTO from './dto/update-offer.dto.js';
import { SortKind } from '../../types/sort-kind.enum.js';


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

  public async getById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(offerId).populate(['features', 'ownerId']).exec();
  }

  public async getList(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const offerLimit = count ?? DEFAULT_OFFER_COUNT;
    return await this.offerModel.find({}, 'offerTitle city offerType publicationDate price isPremium previewImg rating commentsCount').sort({publicationDate: SortKind.Down}).limit(offerLimit).populate(['features', 'ownerId']).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, updateOfferDTO, {new:true}).exec();
  }

}
