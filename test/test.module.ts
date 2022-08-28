import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        TEST_DB_HOST: Joi.string().required(),
        TEST_DB_PORT: Joi.number().required(),
        TEST_DB_USER: Joi.string().required(),
        TEST_DB_PASS: Joi.string().required(),
        TEST_DB_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('TEST_DB_TYPE'),
          host: configService.get('TEST_DB_HOST'),
          port: +configService.get('TEST_DB_PORT'),
          username: configService.get('TEST_DB_USER'),
          password: configService.get('TEST_DB_PASS'),
          database: configService.get('TEST_DB_NAME'),
          entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
          synchronize: true,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class TestModule {}
