import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST', 'localhost'),
          port: +configService.get('DB_PORT', 5432),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          entities: [join(__dirname, '../', '**', '*.entity.{ts,js}')],
          // ssl: {
          //   rejectUnauthorized: false,
          // },
          synchronize: true, // should be false at production!
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
