import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import UpdateOfferDTO from './dto/update-offer.dto.js';

export interface OfferDBServiceInterface {
  create(offerDTO: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  getById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getList(count?: number|undefined): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, updateOfferDTO: UpdateOfferDTO): Promise<DocumentType<OfferEntity> | null>;
  checkOffer(offerId: string): Promise<boolean>;
  commentInfoUpdate(offerId: string): Promise<void>;
}
