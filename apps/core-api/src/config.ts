import { ConfigParser } from '@shared/infrastructure/server/ConfigParser';

export interface CoreApiConfig {
  serverPort: number;
}

export const loadCoreApiConfig = (): CoreApiConfig => {
  return {
    serverPort: ConfigParser.getOptionalNumberEnvVar('SERVER_PORT', 3000),
  };
};
