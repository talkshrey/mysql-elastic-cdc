import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticModule } from './db/elastic/elastic.module';
import { MysqlModule } from './db/mysql/mysql.module';

@Module({
  imports: [ElasticModule, MysqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
