import { Space } from './Model';

export class MissingFieldError extends Error {}

export function validateAsSpaceEntry(arg: any) {
  if (!(arg as Space).SpaceID) {
    throw new MissingFieldError('SpaceID required!');
  }
  if (!(arg as Space).location) {
    throw new MissingFieldError('Location required!');
  }
  if (!(arg as Space).name) {
    throw new MissingFieldError('Name required!');
  }
}
