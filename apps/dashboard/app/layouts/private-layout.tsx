import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';

import { requireUser } from '../.server/auth';
import type { DemoUser } from '../auth-config';

export type PrivateLayoutContext = {
  user: DemoUser;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { user: await requireUser(request) };
};

const getNavigationClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition',
    isActive
      ? 'bg-cyan-400 text-slate-950'
      : 'text-slate-300 hover:bg-white/10 hover:text-white',
  ].join(' ');

export const PrivateLayout = () => {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden min-h-screen flex-col bg-slate-950 p-5 text-white lg:flex">
        <NavLink className="flex items-center gap-3 px-2 py-2" to="/dashboard">
          <span className="grid size-10 place-items-center rounded-xl bg-cyan-400 text-sm font-black text-slate-950">
            CE
          </span>
          <span>
            <span className="block font-black tracking-tight">
              Crypto Exchange
            </span>
            <span className="block text-xs font-medium text-slate-400">
              Client workspace
            </span>
          </span>
        </NavLink>

        <nav aria-label="Dashboard navigation" className="mt-8 space-y-2">
          <NavLink className={getNavigationClassName} to="/dashboard">
            <span
              aria-hidden="true"
              className="grid size-6 place-items-center rounded-md bg-current/10 text-xs"
            >
              O
            </span>
            Overview
          </NavLink>
          <NavLink className={getNavigationClassName} to="/settings">
            <span
              aria-hidden="true"
              className="grid size-6 place-items-center rounded-md bg-current/10 text-xs"
            >
              S
            </span>
            Settings
          </NavLink>
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-bold text-white">{user.name}</p>
          <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
          <Form action="/logout" method="post">
            <button
              className="mt-4 w-full rounded-xl border border-white/15 px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/10"
              type="submit"
            >
              Sign out
            </button>
          </Form>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="border-b border-slate-200 bg-white">
          <div className="flex min-h-16 items-center justify-between gap-4 px-5 sm:px-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Workspace
              </p>
              <p className="font-bold text-slate-950">Account dashboard</p>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 lg:hidden"
                to="/settings"
              >
                Settings
              </NavLink>
              <NavLink
                aria-label="Open profile"
                className="hidden rounded-xl px-3 py-2 text-right transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 sm:block"
                to="/profile"
              >
                <p className="text-sm font-bold text-slate-950">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </NavLink>
              <Form action="/logout" method="post" className="lg:hidden">
                <button
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:border-slate-950 hover:text-slate-950"
                  type="submit"
                >
                  Sign out
                </button>
              </Form>
            </div>
          </div>
        </header>

        <Outlet context={{ user } satisfies PrivateLayoutContext} />
      </div>
    </div>
  );
};

export default PrivateLayout;
