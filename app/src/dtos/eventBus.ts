import { MessageAttributeValue } from '@aws-sdk/client-sqs';

export class EventBusMessageAttributesDTO {
  type: MessageAttributeValue;

  status: MessageAttributeValue;

  event: MessageAttributeValue;
}
