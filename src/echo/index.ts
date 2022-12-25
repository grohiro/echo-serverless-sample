import { APIGatewayEvent, Context, APIGatewayProxyCallback } from 'aws-lambda';
import * as echo from './echo';

export const handler = (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): void => {

  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);

  const params = event.queryStringParameters;

  let body: string = '';
  switch (event.httpMethod.toLowerCase()) {
    case 'get':
      body = event.queryStringParameters?.s || '';
      break;
    case 'post':
      body = event.body || '';
      break;
  }

  const options = echo.getOpts(params?.options || '');

  const res = echo.invoke(body, options);

  callback(null, {
    statusCode: 200,
    body: res,
  });
}
