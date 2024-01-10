import { MessageAttributeValue } from '@aws-sdk/client-sns';

export type EventBusMessageAttributes = {
  [key: string]: MessageAttributeValue;

  type: MessageAttributeValue;

  status: MessageAttributeValue;

  event: MessageAttributeValue;
};
