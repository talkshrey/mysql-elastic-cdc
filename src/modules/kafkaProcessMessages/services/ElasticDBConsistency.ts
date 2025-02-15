import { EachMessagePayload } from 'kafkajs';
import { Inject, Logger } from '@nestjs/common';
import { KafkaConsumerService } from 'src/db/kafka/kafkaConsumer.service';
export default class ElasticDBConsistencyOnEntityUpdateKafkaConsumer {
  constructor(
    @Inject(KafkaConsumerService)
    private kafkaConsumerService: KafkaConsumerService,
  ) {}
  async consume(): Promise<void> {
    try {
      const kafkaTopics = [
        'dbserver1.inventory.products',
        'dbserver1.inventory.users',
        'dbserver1.inventory.orders',
      ];

      await this.kafkaConsumerService.consume({ topics: kafkaTopics }, '', {});
    } catch (error) {
      Logger.error(`Error while listening to kafka's consumer: ${error} `);
    }
  }

  messageParser({ topic, partition, message }: EachMessagePayload): {
    topic: string;
    key: string | undefined;
    value: string | undefined;
  } | void {
    Logger.log(
      `Kafka order processing message parser logs, topic: ${topic}, partition: ${partition}`,
    );
    try {
      const value = message.value?.toString();
      Logger.log(
        `Kafka order processing consumer message value logs without parse: ${value}`,
      );
      return {
        topic,
        key: message.key?.toString(),
        value,
      };
    } catch (error) {
      Logger.error(`Error while parsing message: ${error}`);
    }
  }
}
