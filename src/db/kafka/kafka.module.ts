import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KafkaConsumerService } from './kafkaConsumer.service';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule],
  providers: [KafkaService, KafkaConsumerService, ConfigService],
  exports: [KafkaService, KafkaConsumerService],
})
export class KafkaModule {}
