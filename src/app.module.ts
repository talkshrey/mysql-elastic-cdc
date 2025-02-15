import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticModule } from './db/elastic/elastic.module';
import { MysqlModule } from './db/mysql/mysql.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './db/kafka/kafka.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ReadKafkaMessagesModule } from './modules/kafkaProcessMessages/readKafkaMessages.module';

void ConfigModule.forRoot();

@Module({
  imports: [
    {
      ...ElasticsearchModule.register({
        node: 'http://localhost:9200',
      }),
      global: true,
    },
    ElasticModule,
    MysqlModule,
    KafkaModule,
    ReadKafkaMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
