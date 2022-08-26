import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    @InjectDataSource() private readonly datasource,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/db-version')
  async getDbVersion(): Promise<string> {
    const runner = await this.datasource.createQueryRunner();
    const dbType = this.configService.get('DB_TYPE');
    const sql =
      dbType === 'sqlite'
        ? 'SELECT date("now") || "T" || time("now") AS "now", SQLITE_VERSION() AS "version";'
        : 'SELECT NOW() AS "now", VERSION() AS "version";';
    return await runner.manager.query(sql);
  }
}
