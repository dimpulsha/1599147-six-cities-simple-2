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


@injectable()
export default class OfferDBService implements OfferDBServiceInterface {

  constructor(
    @inject(RESTAppComponent.OfferModel) private readonly offerModel: ModelType<OfferEntity>,
    @inject(RESTAppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(RESTAppComponent.CommentsDBServiceInterface) private readonly comments: CommentsDBServiceInterface,
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
    return await this.offerModel.find().sort({ publicationDate: SortKind.Down }).limit(offerLimit).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndDelete(offerId).exec();
    if (result) {
      this.comments.deleteByOfferId(offerId);
      this.logger.info(`Delete offer ${offerId}`);
    }
    return result;
  }

  public async updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null> {
    this.logger.info(`Update offer ${offerId}`);
    return this.offerModel.findByIdAndUpdate(offerId, updateOfferDTO, {new:true}).exec();
  }

  public async commentInfoUpdate(offerId: string): Promise<void> {
    const offerComments = await this.comments.getByOfferId(offerId);
    const commentsCount = offerComments.length;
    const avgSumm = offerComments.map(({ rate }) => rate).reduce((avg, rate) => avg + rate / commentsCount, 0);
    const avgRating = Math.round(avgSumm * 10) / 10;
    await this.offerModel.findByIdAndUpdate(offerId, [{ $set: { rating: avgRating } }, { $set: { commentsCount: commentsCount } }]);
  }

}
