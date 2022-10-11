export const RESTAppComponent = {
  Application: Symbol.for('Application'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigInterface: Symbol.for('ConfigInterface'),
  DatabaseInterface: Symbol.for('DatabaseInterface'),
  UserDBServiceInterface: Symbol.for('UserDBServiceInterface'),
  UserModel: Symbol.for('UserMosel'),
  FeatureDBServiceInterface: Symbol.for('FeatureDBServiceInterface'),
  FeatureModel: Symbol.for('FeatureModel'),
  OfferDBServiceInterface: Symbol.for('OfferDBServiceInterface'),
  OfferModel: Symbol.for('OfferModel'),
  CommentsDBServiceInterface: Symbol.for('CommentsDBServiceInterface'),
  CommentsModel: Symbol.for('CommentsModel'),
} as const;
