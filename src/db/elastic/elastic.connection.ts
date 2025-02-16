/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export class ElasticConnector {
  constructor(
    @Inject(ElasticsearchService) private elastic: ElasticsearchService,
  ) {}

  async updateUserData(userId: string, updatedData: any): Promise<void> {
    await this.elastic.updateByQuery({
      index: 'demo_index',
      body: {
        query: {
          match: {
            user_id: userId,
          },
        },
        script: {
          source: 'ctx._source.putAll(params.document)',
          params: {
            document: updatedData,
          },
        },
      },
    });
  }

  async updateProductData(productId: string, updatedData: any): Promise<void> {
    await this.elastic.updateByQuery({
      index: 'demo_index',
      body: {
        query: {
          match: {
            product_id: productId,
          },
        },
        script: {
          source: 'ctx._source.putAll(params.document)',
          params: {
            document: updatedData,
          },
        },
      },
    });
  }

  async updateOrderData(orderId: string, updatedData: any): Promise<void> {
    await this.elastic.updateByQuery({
      index: 'demo_index',
      body: {
        query: {
          match: {
            order_id: orderId,
          },
        },
        script: {
          source: 'ctx._source.putAll(params.document)',
          params: {
            document: updatedData,
          },
        },
      },
    });
  }
}
