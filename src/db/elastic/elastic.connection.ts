import { Inject, Logger } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

export class ElasticConnector {
  constructor(
    @Inject(ElasticsearchService) private elastic: ElasticsearchService,
  ) {}
  async deleteDocumentByQuery(body: Record<string, any>) {
    try {
      Logger.log(
        `Requesting data from elastic for the query: ${JSON.stringify(body)}`,
      );
      const elasticCallStartTime = Date.now();
      const response = await this.elastic.deleteByQuery({
        index: 'migration-dummy',
        body,
      });
      const elasticCallEndTime = Date.now();
      Logger.log(
        `Call to elastic took ${elasticCallEndTime - elasticCallStartTime} milliseconds`,
      );
      return response;
    } catch (error) {
      throw new Error(`Something went wrong! ${error}`);
    }
  }
}
