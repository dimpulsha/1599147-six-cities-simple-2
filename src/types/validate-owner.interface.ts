export interface ValidateOwnerInterface {
   checkOwner(offerId: string, ownerId:string): Promise<boolean>;
 }
