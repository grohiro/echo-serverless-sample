import { APIGatewayEvent, Context, APIGatewayProxyCallback } from 'aws-lambda';
import * as info from './info';

export const handler = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): void => {

  const res = info.invoke(event, context);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(res),
  });
}


