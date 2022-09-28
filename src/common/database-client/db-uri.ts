export const getMongoURI = (
  userName: string,
  password: string,
  host: string,
  port: number,
  databaseName: string
): string => `mongodb://${userName}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
