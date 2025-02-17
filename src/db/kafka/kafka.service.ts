/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly kafka: Kafka;
  constructor() {
    this.kafka = new Kafka({
      clientId: 'kafka-ui-consumer-1739629007266',
      brokers: ['127.0.0.1:9092'],
      retry: {
        retries: 5,
      },
    });
  }

  getKafka2Instance(): Kafka {
    return this.kafka;
  }
}
