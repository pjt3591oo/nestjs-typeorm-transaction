import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = "development",
  Production = "production",
  Test = "test",
  Provision = "provision",
}

export enum DATABASE_TYPE {
  MYSQL = 'mysql',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;
  
  @IsString()
  HOST: string

  @IsString()
  USERNAME: string

  @IsString()
  PASSWORD: string

  @IsString()
  DATABASE: string

  @IsBoolean()
  SYNCHRONIZE: boolean;

  @IsBoolean()
  LOGGING: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvironmentVariables,
    config,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}