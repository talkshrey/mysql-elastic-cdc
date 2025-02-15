import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'src/db/kafka/kafka.module';
import ElasticDBConsistencyOnEntityUpdateKafkaConsumer from './services/ElasticDBConsistency';

@Module({
  imports: [ConfigModule, KafkaModule],
  providers: [ElasticDBConsistencyOnEntityUpdateKafkaConsumer],
})
export class ReadKafkaMessagesModule implements OnModuleInit {
  constructor(
    private elasticDbConsistencyOnEntityUpdate: ElasticDBConsistencyOnEntityUpdateKafkaConsumer,
  ) {}

  onModuleInit() {
    this.elasticDbConsistencyOnEntityUpdate.consume().catch((err) => {
      Logger.error(`Error in kafka message consumer, ${err}`);
    });
  }
}
