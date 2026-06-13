import type { ActionFunctionArgs } from 'react-router';
import { redirect } from 'react-router';

import { destroyUserSession } from '../../.server/auth';

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== 'POST') {
    throw redirect('/');
  }

  return destroyUserSession();
};
