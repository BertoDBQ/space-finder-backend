import { APIGatewayProxyEvent } from 'aws-lambda';

import { handler as createHandler } from '../../services/Spaces/Create';
import { handler as readHandler } from '../../services/Spaces/Read';
import { handler as updateHandler } from '../../services/Spaces/Update';
import { handler as deleteHandler } from '../../services/Spaces/Delete';

// ******************************
// Create
// ******************************
const event: APIGatewayProxyEvent = {
  body: {
    location: 'Dubuque',
    name: 'Mustangs',
  },
} as any;

const createResult = createHandler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});

// ******************************
// Read Single Item
// ******************************
const readEvent: APIGatewayProxyEvent = {
  queryStringParameters: {
    SpaceID: 'fad20a55-40c5-460a-8234-80a07d3101e5',
  },
} as any;

const readResult = readHandler(readEvent, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});

// ******************************
// Read ALL (scan)
// ******************************
const result = readHandler({} as any, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});

// ******************************
// Update Single Item
// ******************************
const updateEvent: APIGatewayProxyEvent = {
  queryStringParameters: {
    SpaceID: 'fad20a55-40c5-460a-8234-80a07d3101e5',
  },
  body: {
    location: 'Iowa City',
  },
} as any;

const updateResult = updateHandler(updateEvent, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});

// ******************************
// Delete Single Item
// ******************************
const deleteEvent: APIGatewayProxyEvent = {
  queryStringParameters: {
    SpaceID: 'b64a0d6c-bcd6-49da-9583-849f8d8ba7a4',
  },
} as any;

const deleteResult = deleteHandler(deleteEvent, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});
