import { ConfigParser } from '@shared/infrastructure/server/ConfigParser';

export interface CoreApiConfig {
  serverPort: number;
  isLocal: boolean;
  mongoUri: string;
}

export const loadCoreApiConfig = (): CoreApiConfig => {
  const currentEnv = ConfigParser.getMandatoryStringEnvVar('NODE_ENV');

  return {
    serverPort: ConfigParser.getOptionalNumberEnvVar('SERVER_PORT', 3000),
    isLocal: currentEnv === 'local',
    mongoUri: ConfigParser.getMandatoryStringEnvVar('MONGO_URI'),
  };
};
