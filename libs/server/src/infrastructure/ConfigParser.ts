import { ApiError } from './ApiError';

export class ConfigParser {
  static getOptionalNumberEnvVar(envVarName: string, defaultValue: number): number {
    const value = process.env[envVarName];
    if (value && !Number.isNaN(Number(value))) {
      return parseInt(value, 10);
    }
    return defaultValue;
  }

  static getOptionalStringEnvVar(envVarName: string, defaultValue: string): string {
    return process.env[envVarName] || defaultValue;
  }

  static getMandatoryStringEnvVar(envVarName: string): string {
    if (!process.env[envVarName]) {
      throw ApiError.internal(`Missing mandatory ${envVarName}`);
    }
    return process.env[envVarName] as string;
  }

  static getMandatoryNumberEnvVar(envVarName: string): number {
    const value = process.env[envVarName];
    if (value && !isNaN(Number(value))) {
      return parseInt(value, 10);
    }
    throw ApiError.internal(`Missing mandatory ${envVarName}`);
  }
}
