import { APIGatewayEvent, Context, APIGatewayProxyCallback } from 'aws-lambda';
import * as time from './time';

export const handler = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): void => {

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  const body = time.invoke();

  callback(null, {
    statusCode: 200,
    body,
  });
}

