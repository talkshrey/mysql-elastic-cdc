import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'src/db/kafka/kafka.module';
import ReadKafkaMessagesService from './readKafkaMessages.service';
import { ElasticModule } from 'src/db/elastic/elastic.module';

@Module({
  imports: [ConfigModule, KafkaModule, ElasticModule],
  providers: [ReadKafkaMessagesService],
})
export class ReadKafkaMessagesModule implements OnModuleInit {
  constructor(
    private elasticDbConsistencyOnEntityUpdate: ReadKafkaMessagesService,
  ) {}

  onModuleInit() {
    this.elasticDbConsistencyOnEntityUpdate.consume().catch((err) => {
      Logger.error(`Error in kafka message consumer, ${err}`);
    });
  }
}
