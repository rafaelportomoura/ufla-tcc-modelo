import { Logger } from '../adapters/logger';
import { SNS } from '../aws/sns';
import { CONFIGURATION } from '../constants/configuration';
import { EventBusMessageAttributesDTO } from '../dtos/eventBus';

export class EventBus extends SNS {
  constructor(
    private logger: Logger,
    private topic = CONFIGURATION.EVENT_BUS
  ) {
    super();
  }

  async publish(body: unknown, message_attributes: EventBusMessageAttributesDTO): Promise<void> {
    this.logger.debug('EventBus.publish(', body, message_attributes, ')');

    const response = await this.pub({
      TopicArn: this.topic,
      Message: JSON.stringify(body),
      MessageAttributes: message_attributes
    });

    this.logger.debug('EventBus.publish ->', response);
  }
}
