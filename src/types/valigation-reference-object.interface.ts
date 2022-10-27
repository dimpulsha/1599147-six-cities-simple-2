export interface ValidateReferenceByNameInterface {
  getIdByName(objectName: string): Promise<string | null>;
}
