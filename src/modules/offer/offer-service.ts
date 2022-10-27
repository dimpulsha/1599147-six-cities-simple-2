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
import { CommentsDBServiceInterface } from '../comments/comments-service.interface.js';
import { CitiesDBServiceInterface } from '../cities/cities-service.interface.js';
import { FeatureDBServiceInterface } from '../features/feature-service.interface.js';
import HttpError from '../../common/errors/http.errors.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class OfferDBService implements OfferDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.OfferModel) private readonly offerModel: ModelType<OfferEntity>,
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsDBServiceInterface) private readonly commentsService?: CommentsDBServiceInterface,
    @inject(RESTAppComponent.CitiesDBServiceInterface) private readonly cityService?: CitiesDBServiceInterface,
    @inject(RESTAppComponent.FeatureDBServiceInterface) private readonly featureService?:FeatureDBServiceInterface
  ) { }


  private async checkRelatedCity(cityName: string): Promise<string> {
    const result = await this.cityService?.getIdByName(cityName);
    console.log(result);

    if (!result) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `City name = ${cityName} not found in database.`,
        'ValidationRelatedDocument'
      );
    }
    return result;
  }

  private async checkRelatedFeatures(featureName: string): Promise<string> {
    const result = await this.featureService?.getIdByName(featureName);
    if (!result) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Feature name = ${featureName} not found in database.`,
        'ValidationRelatedDocument'
      );
    }
    return result;
  }

  private async checkOfferRelations(offerDTO: CreateOfferDTO | UpdateOfferDTO): Promise<void> {
    if (offerDTO.cityId) {
      offerDTO.cityId = await this.checkRelatedCity(offerDTO.cityId);
    }
    if (offerDTO.features && offerDTO.features.length > 0)
    {
      for (let i = 0; i < offerDTO.features.length; i++) {
        offerDTO.features[i] = await this.checkRelatedFeatures(offerDTO.features[i]);
      }}
  }

  public async create(offerDTO: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    await this.checkOfferRelations(offerDTO);
    const createResult = await this.offerModel.create(offerDTO);
    this.logger.info(`New offer created ${offerDTO.offerTitle}`);
    return createResult;
  }

  public async getById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(offerId).populate(['cityId', 'features', 'ownerId']).exec();
  }

  public async getList(count?: number): Promise<DocumentType<OfferEntity>[]> {
    let recordLimit = DEFAULT_OFFER_COUNT;
    if (count) {
      recordLimit = count;
    }
    this.logger.debug(`Requested ${recordLimit} records from offers collection`);
    return await this.offerModel.find().sort({ publicationDate: SortKind.Down }).populate(['cityId']).limit(recordLimit).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndDelete(offerId).exec();
    if (result) {
      this.commentsService?.deleteByOfferId(offerId);
      this.logger.info(`Delete offer ${offerId}`);
    }
    return result;
  }

  public async updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    await this.checkOfferRelations(updateOfferDTO);
    this.logger.info(`Update offer ${offerId}`);
    return this.offerModel.findByIdAndUpdate(offerId, updateOfferDTO, {new:true}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async commentInfoUpdate(offerId: string): Promise<void> {
    if (this.commentsService) {
      const offerComments = await this.commentsService.getByOfferId(offerId);
      const commentsCount = offerComments.length;
      const avgSumm = offerComments.map(({ rate }) => rate).reduce((avg, rate) => avg + rate / commentsCount, 0);
      const avgRating = Math.round(avgSumm * 10) / 10;
      await this.offerModel.findByIdAndUpdate(offerId, [{ $set: { rating: avgRating } }, { $set: { commentsCount: commentsCount } }]);
    }
  }

  public async checkOwner(offerId: string, userId:string): Promise<boolean> {
    const offer = await this.getById(offerId);
    if (offer) {

      console.log(offer?.ownerId?.id);
      console.log(userId);

      return (offer?.ownerId?.id === userId);
    }
    return false;
  }

}
