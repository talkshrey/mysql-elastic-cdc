/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import type {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
} from 'kafkajs';
import { KafkaService } from './kafka.service';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly consumers: Consumer[] = [];
  constructor(@Inject(KafkaService) private kafkaService: KafkaService) {}

  async consume(
    topics: ConsumerSubscribeTopics,
    groupId: string,
    config: ConsumerRunConfig,
  ): Promise<void> {
    const consumer = this.kafkaService.getKafka2Instance().consumer({
      groupId: groupId,
    });
    await consumer.connect();
    await consumer.subscribe(topics);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown(): Promise<void> {
    for (const consumer of this.consumers) {
      await consumer.disconnect().catch((err: { message: any; stack: any }) => {
        Logger.error(err.message, err.stack);
      });
    }
  }
}
