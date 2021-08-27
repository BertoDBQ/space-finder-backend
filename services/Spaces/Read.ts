import { DynamoDB } from 'aws-sdk';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { RestApi } from 'aws-cdk-lib/lib/aws-apigateway';

const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

const dbClient = new DynamoDB.DocumentClient();

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from DynamoDB',
  };

  try {
    if (event.queryStringParameters) {
      if (PRIMARY_KEY! in event.queryStringParameters) {
        result.body = await queryWithPrimaryPartition(
          event.queryStringParameters
        );
      } else {
        result.body = await queryWithSecondaryPartition(
          event.queryStringParameters
        );
      }
    } else {
      result.body = await scanTable();
    }
  } catch (error) {
    result.body = error.message;
  }

  return result;
}

async function scanTable() {
  // rja - is the .promise needed ???
  const queryResponse = await dbClient
    .scan({
      TableName: TABLE_NAME!,
    })
    .promise();

  return JSON.stringify(queryResponse.Items);
}

async function queryWithPrimaryPartition(
  queryParms: APIGatewayProxyEventQueryStringParameters
) {
  // rja - is the .promise needed ???
  const keyValue = queryParms[PRIMARY_KEY!];
  const queryResponse = await dbClient
    .query({
      TableName: TABLE_NAME!,
      KeyConditionExpression: '#zz = :zzzz',
      ExpressionAttributeNames: {
        '#zz': PRIMARY_KEY!,
      },
      ExpressionAttributeValues: {
        ':zzzz': keyValue,
      },
    })
    .promise();

  return JSON.stringify(queryResponse.Items);
}

async function queryWithSecondaryPartition(
  queryParms: APIGatewayProxyEventQueryStringParameters
) {
  const queryKey = Object.keys(queryParms)[0];
  const queryValue = queryParms[queryKey];

  // rja - is the .promise needed ???
  const queryResponse = await dbClient
    .query({
      TableName: TABLE_NAME!,
      IndexName: queryKey,
      KeyConditionExpression: '#zz = :zzzz',
      ExpressionAttributeNames: {
        '#zz': queryKey,
      },
      ExpressionAttributeValues: {
        ':zzzz': queryValue,
      },
    })
    .promise();

  return JSON.stringify(queryResponse.Items);
}

export { handler };
