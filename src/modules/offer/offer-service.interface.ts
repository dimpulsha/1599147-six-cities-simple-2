import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDTO from './dto/create-offer.dto.js';

export interface OfferDBServiceInterface {
  create(offerDTO: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  getById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getList(): Promise<DocumentType<OfferEntity>[]>;
}
