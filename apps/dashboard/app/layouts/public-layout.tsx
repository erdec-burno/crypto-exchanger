import {
  NavLink,
  Outlet,
  useLoaderData,
  type LoaderFunctionArgs,
} from 'react-router';
import { useTranslation } from 'react-i18next';

import { getUser } from '../.server/auth';
import type { DemoUser } from '../auth-config';

export type PublicLayoutContext = {
  user: DemoUser | null;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return { user: await getUser(request) };
};

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-slate-950 text-white'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
  ].join(' ');

export const PublicLayout = () => {
  const { user } = useLoaderData<typeof loader>();
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <NavLink
            className="text-lg font-black tracking-tight text-slate-950"
            to="/"
          >
            {t('app.name')}
          </NavLink>
          <nav
            aria-label="Public navigation"
            className="flex items-center gap-1"
          >
            <NavLink className={getLinkClassName} to="/support">
              Support
            </NavLink>
            <NavLink className={getLinkClassName} to="/terms">
              Terms
            </NavLink>
            <NavLink
              className={getLinkClassName}
              to={user ? '/dashboard' : '/login'}
            >
              {user ? 'Dashboard' : 'Sign in'}
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet context={{ user } satisfies PublicLayoutContext} />
    </div>
  );
};

export default PublicLayout;
