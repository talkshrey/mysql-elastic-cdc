import { Module } from '@nestjs/common';
import { ElasticConnector } from './elastic.connection';

@Module({
  providers: [ElasticConnector],
  exports: [ElasticConnector],
})
export class ElasticModule {}
