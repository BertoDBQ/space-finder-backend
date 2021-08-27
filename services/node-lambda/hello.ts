import { APIGatewayProxyEvent } from 'aws-lambda';

async function handler(event: any, context: any) {
  if (isAuthorized(event)) {
    return {
      statusCode: 200,
      body: JSON.stringify('You are authorized'),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify('You are unauthorized'),
    };
  }
}

function isAuthorized(event: APIGatewayProxyEvent) {
  const groups = event.requestContext.authorizer?.claims['cognito:grops'];
  if (groups) {
    return (groups as string).includes('admins');
  } else {
    return false;
  }
}

export { handler };
