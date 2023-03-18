import { ConfigParser } from '@shared/infrastructure/server/ConfigParser';

export interface CoreApiConfig {
  serverPort: number;
  isLocal: boolean;
}

export const loadCoreApiConfig = (): CoreApiConfig => {
  const currentEnv = ConfigParser.getMandatoryStringEnvVar('NODE_ENV');

  return {
    serverPort: ConfigParser.getOptionalNumberEnvVar('SERVER_PORT', 3000),
    isLocal: currentEnv === 'local',
  };
};
