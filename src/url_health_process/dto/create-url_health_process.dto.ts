import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsPort,
  IsString,
  MinLength,
} from "class-validator";
import { Protocol } from "../schemas/url_health_process.schema";

export class CreateUrlHealthProcessDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsEnum(Protocol)
  protocol?: Protocol = Protocol.HTTP;

  @Type(() => String)
  @IsOptional()
  @IsString()
  path?: string = "/";

  @IsOptional()
  @IsPort()
  port?: string;

  @IsOptional()
  @IsString()
  webhook?: string;

  @IsOptional()
  @IsInt()
  timeout?: number = 5;

  @IsOptional()
  @IsInt()
  interval?: number = 10 * 60;

  @IsOptional()
  @IsInt()
  threshold?: number = 1;

  @IsOptional()
  authentication?: {
    username: string;
    password: string;
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  httpHeaders?: string[];

  @IsOptional()
  assert?: {
    statusCode: number;
  };

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsOptional()
  @IsBoolean()
  ignoreSSL?: boolean = false;
}
