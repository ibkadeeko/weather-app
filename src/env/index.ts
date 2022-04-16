import { generalLogger } from '../lib';

export enum envEnum {
  DEV = 'development',
  PROD = 'production',
  STAGING = 'staging',
  TESTING = 'test',
}

export interface EnvStore {
  DATABASE_TYPE: string;
  DATABASE_PORT: string;
  DATABASE_HOST: string;
  DATABASE_NAME: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  TEST_DATABASE_TYPE: string;
  TEST_DATABASE_PORT: string;
  TEST_DATABASE_HOST: string;
  TEST_DATABASE_NAME: string;
  TEST_DATABASE_USERNAME: string;
  TEST_DATABASE_PASSWORD: string;
  DB_LOGGING: string;
  JWT_SECRET: string;
  JWT_EXPIRY_TIME: string;
}

export const envStore: EnvStore = {
  DATABASE_TYPE: '',
  DATABASE_PORT: '',
  DATABASE_HOST: '',
  DATABASE_NAME: '',
  DATABASE_USERNAME: '',
  DATABASE_PASSWORD: '',
  TEST_DATABASE_TYPE: '',
  TEST_DATABASE_PORT: '',
  TEST_DATABASE_HOST: '',
  TEST_DATABASE_NAME: '',
  TEST_DATABASE_USERNAME: '',
  TEST_DATABASE_PASSWORD: '',
  DB_LOGGING: '',
  JWT_SECRET: '',
  JWT_EXPIRY_TIME: '',
};

const setEnvStoreFromEnvironment = () => {
  Object.keys(envStore).forEach((envVar: keyof EnvStore) => {
    if (process.env[envVar]) {
      envStore[envVar] = process.env[envVar] || '';
    }
  });
};

export const configureENV = async (): Promise<void> => {
  setEnvStoreFromEnvironment();
  const emptyDataResults = Object.keys(envStore).filter((envVar: keyof EnvStore) => envStore[envVar] === '');

  if (emptyDataResults.length > 0) {
    generalLogger.error(`The following environmental variables are missing: ${emptyDataResults.join(', ')}`);
    process.exit(1);
  }
};
