export interface MongoDBInterface {
  connect(uri: string): Promise<void>;
  disconnect() : Promise<void>;
}
