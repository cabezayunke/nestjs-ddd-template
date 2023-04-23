import { ConfigParser } from '@utils/server/infrastructure/ConfigParser';

export interface CoreApiConfig {
  serverPort: number;
  isLocal: boolean;
  isTest: boolean;
  mongoUri: string;
}

export const loadCoreApiConfig = (): CoreApiConfig => {
  const currentEnv = ConfigParser.getMandatoryStringEnvVar('NODE_ENV');

  return {
    serverPort: ConfigParser.getOptionalNumberEnvVar('SERVER_PORT', 3000),
    isLocal: currentEnv === 'local',
    isTest: currentEnv === 'test',
    mongoUri: ConfigParser.getMandatoryStringEnvVar('MONGO_URI'),
  };
};
