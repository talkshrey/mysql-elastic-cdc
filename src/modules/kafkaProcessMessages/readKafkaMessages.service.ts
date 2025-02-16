/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { EachMessagePayload } from 'kafkajs';
import { Inject, Logger } from '@nestjs/common';
import { KafkaConsumerService } from 'src/db/kafka/kafkaConsumer.service';
import { ElasticConnector } from 'src/db/elastic/elastic.connection';
export default class ReadKafkaMessagesService {
  constructor(
    @Inject(KafkaConsumerService)
    private kafkaConsumerService: KafkaConsumerService,
    @Inject(ElasticConnector) private elastic: ElasticConnector,
  ) {}
  async consume(): Promise<void> {
    try {
      const kafkaTopics = [
        'dbserver1.inventory.products',
        'dbserver1.inventory.users',
        'dbserver1.inventory.orders',
      ];

      console.log('Listening to kafka consumer');

      await this.kafkaConsumerService.consume(
        { topics: kafkaTopics },
        'kafka-consumer-1',
        {
          eachMessage: async (params) => {
            const { topic, key, value } = this.messageParser(params);
            Logger.log(
              `Received message on topic ${topic} ----> key: ${key}, value: ${value}`,
            );
            await this.processMessage({ topic, key, value });
          },
        },
      );
    } catch (error) {
      Logger.error(`Error while listening to kafka's consumer: ${error} `);
    }
  }

  async processMessage({
    topic,
    value,
  }: {
    topic: string;
    key: string | undefined;
    value: string | undefined;
  }): Promise<void> {
    switch (topic) {
      case 'dbserver1.inventory.products':
        await this.processProductMessage(value);
        break;
      case 'dbserver1.inventory.users':
        await this.processUserMessage(value);
        break;
      case 'dbserver1.inventory.orders':
        await this.processOrderMessage(value);
        break;
      default:
        Logger.log(`Unhandled topic: ${topic}`);
        break;
    }
  }

  private async processProductMessage(
    value: string | undefined,
  ): Promise<void> {
    Logger.log('Processing product message', value);
    if (!value) return;

    try {
      const parsed = JSON.parse(value);
      const payload = parsed.payload;
      if (payload && payload.after) {
        // Assuming the product id is stored in payload.after.id
        const productId = String(payload.after.id);
        const updatedData = payload.after;
        await this.elastic.updateProductData(productId, updatedData);
        Logger.log(`Product data updated for product_id: ${productId}`);
      } else {
        Logger.error('Missing "after" data in product payload:', payload);
      }
    } catch (error) {
      Logger.error('Error parsing product message value:', error);
    }
  }

  private async processUserMessage(value: string | undefined): Promise<void> {
    Logger.log('Processing user message', value);
    if (!value) return;

    try {
      const parsed = JSON.parse(value);
      const payload = parsed.payload;
      if (payload && payload.after) {
        const userId = String(payload.after.id);
        const updatedData = payload.after;
        await this.elastic.updateUserData(userId, updatedData);
        Logger.log(`User data updated for user_id: ${userId}`);
      } else {
        Logger.error('Missing "after" data in user payload:', payload);
      }
    } catch (error) {
      Logger.error('Error parsing user message value:', error);
    }
  }

  private async processOrderMessage(value: string | undefined): Promise<void> {
    Logger.log('Processing order message', value);
    if (!value) return;

    try {
      const parsed = JSON.parse(value);
      const payload = parsed.payload;
      if (payload && payload.after) {
        // Assuming the order id is stored in payload.after.id
        const orderId = String(payload.after.id);
        const updatedData = payload.after;
        await this.elastic.updateOrderData(orderId, updatedData);
        Logger.log(`Order data updated for order_id: ${orderId}`);
      } else {
        Logger.error('Missing "after" data in order payload:', payload);
      }
    } catch (error) {
      Logger.error('Error parsing order message value:', error);
    }
  }

  messageParser({ topic, message }: EachMessagePayload): {
    topic: string;
    key: string | undefined;
    value: string | undefined;
  } {
    const value = message.value?.toString();
    return {
      topic,
      key: message.key?.toString(),
      value,
    };
  }
}
