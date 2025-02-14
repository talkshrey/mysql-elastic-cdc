import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticModule } from './db/elastic/elastic.module';
import { MysqlModule } from './db/mysql/mysql.module';
import { ConfigModule } from '@nestjs/config';

void ConfigModule.forRoot();

@Module({
  imports: [ElasticModule, MysqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
