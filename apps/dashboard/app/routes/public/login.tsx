import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from 'react-router';

import {
  createUserSession,
  getUser,
  isValidRedirect,
} from '../../.server/auth';
import { demoCredentials } from '../../auth-config';

export const meta: MetaFunction = () => [
  { title: 'Sign in | Crypto Exchange' },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirectTo');

  if (await getUser(request)) {
    throw redirect(isValidRedirect(redirectTo) ? redirectTo : '/dashboard');
  }

  return {
    redirectTo: isValidRedirect(redirectTo) ? redirectTo : '/dashboard',
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = formData.get('redirectTo');

  if (
    email !== demoCredentials.email ||
    password !== demoCredentials.password
  ) {
    return {
      error: 'Invalid email or password.',
    };
  }

  return createUserSession(
    isValidRedirect(redirectTo) ? redirectTo : '/dashboard',
  );
};

export const LoginPage = () => {
  const { redirectTo } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2">
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          Private workspace
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Sign in to your dashboard
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          This is a local authentication example. The credentials are checked by
          the React Router action without an external API.
        </p>
        <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 text-sm text-slate-700">
          <p className="font-bold text-slate-950">Demo credentials</p>
          <p className="mt-2">
            Email: <code>{demoCredentials.email}</code>
          </p>
          <p>
            Password: <code>{demoCredentials.password}</code>
          </p>
        </div>
      </section>

      <Form
        method="post"
        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9"
      >
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <h2 className="text-2xl font-bold text-slate-950">Welcome back</h2>
        <p className="mt-2 text-sm text-slate-500">
          Enter the demo credentials to continue.
        </p>

        <label className="mt-7 block text-sm font-semibold text-slate-700">
          Email
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
            defaultValue={demoCredentials.email}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>

        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Password
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-100"
            defaultValue={demoCredentials.password}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>

        {actionData?.error ? (
          <p
            className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            role="alert"
          >
            {actionData.error}
          </p>
        ) : null}

        <button
          className="mt-7 w-full rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </Form>
    </main>
  );
};

export default LoginPage;
