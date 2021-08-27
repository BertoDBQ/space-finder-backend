// import { handler } from '../../services/Spaces/Create';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/Spaces/Read';

// ******************************
// Create
// ******************************
// const event = {
//   body: {
//     location: 'Dubuque',
//   },
// };

// handler(event as any , {} as any);

// ******************************
// Read Single Item
// ******************************
const event: APIGatewayProxyEvent = {
  queryStringParameters: {
    SpaceID: 'fad20a55-40c5-460a-8234-80a07d3101e5',
  },
} as any;

const result = handler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123);
});

// ******************************
// Read ALL (scan)
// ******************************
// const result = handler({} as any, {} as any).then((apiResult) => {
//   const items = JSON.parse(apiResult.body);
//   console.log(123);
// });
