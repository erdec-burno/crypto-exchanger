import { createCookie, redirect } from 'react-router';

import { demoCredentials, type DemoUser } from '../auth-config';

const demoUser: DemoUser = {
  email: demoCredentials.email,
  name: 'Demo Admin',
};

const authCookie = createCookie('dashboard_session', {
  httpOnly: true,
  maxAge: 60 * 60 * 8,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
});

export const getUser = async (request: Request): Promise<DemoUser | null> => {
  const email: unknown = await authCookie.parse(request.headers.get('Cookie'));

  return email === demoUser.email ? demoUser : null;
};

export const requireUser = async (request: Request): Promise<DemoUser> => {
  const user = await getUser(request);

  if (user) {
    return user;
  }

  const url = new URL(request.url);
  const redirectTo = `${url.pathname}${url.search}`;

  throw redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
};

export const createUserSession = async (redirectTo: string) => {
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await authCookie.serialize(demoUser.email),
    },
  });
};

export const destroyUserSession = async () => {
  return redirect('/login', {
    headers: {
      'Set-Cookie': await authCookie.serialize('', { maxAge: 0 }),
    },
  });
};

export const isValidRedirect = (
  value: FormDataEntryValue | null,
): value is string => {
  return (
    typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//')
  );
};
