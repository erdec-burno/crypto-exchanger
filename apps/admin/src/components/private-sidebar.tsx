import { useState } from 'react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

import type { User } from '@shared/types';
import { Button } from '@shared/ui';

import { privateNavigationItems } from '../navigation/private-navigation';

type PrivateSidebarProps = {
  user: User;
  onLogout: () => void;
};

const getNavigationClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition',
    isActive
      ? 'bg-cyan-400 text-slate-950'
      : 'text-slate-300 hover:bg-white/10 hover:text-white',
  ].join(' ');

export const PrivateSidebar = ({ user, onLogout }: PrivateSidebarProps) => {
  const { t } = useTranslation('admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuLabel = isMobileMenuOpen
    ? 'Close navigation menu'
    : 'Open navigation menu';

  return (
    <aside
      className={[
        'relative z-30 flex min-h-screen flex-col bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/20 transition-[width]',
        isMobileMenuOpen ? 'w-[260px]' : 'w-[72px]',
        'lg:w-auto lg:p-5 lg:shadow-none',
      ].join(' ')}
    >
      <button
        aria-expanded={isMobileMenuOpen}
        aria-label={mobileMenuLabel}
        className="mb-4 grid size-10 place-items-center rounded-xl text-slate-200 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-4 focus:ring-white/10 lg:hidden"
        type="button"
        onClick={() => setIsMobileMenuOpen((currentValue) => !currentValue)}
      >
        {isMobileMenuOpen ? (
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>

      <NavLink
        className="flex items-center gap-3 px-0 py-2 lg:px-2"
        to="/dashboard"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cyan-400 text-sm font-black text-slate-950">
          CE
        </span>
        <span className={isMobileMenuOpen ? 'block' : 'hidden lg:block'}>
          <span className="block font-black tracking-tight">
            Crypto Exchange
          </span>
          <span className="block text-xs font-medium text-slate-400">
            {t('title')}
          </span>
        </span>
      </NavLink>

      <nav aria-label={t('title')} className="mt-8 space-y-2">
        {privateNavigationItems.map((item) => {
          const icon = 'icon' in item ? item.icon : undefined;

          return (
            <NavLink
              key={item.path}
              className={getNavigationClassName}
              to={`/${item.path}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {icon && (
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-md bg-current/10 text-xs"
                >
                  {icon}
                </span>
              )}
              <span className={isMobileMenuOpen ? 'block' : 'hidden lg:block'}>
                {t(item.translationKey)}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div
        className={[
          'mt-auto rounded-2xl border border-white/10 bg-white/5 p-4',
          isMobileMenuOpen ? 'block' : 'hidden lg:block',
        ].join(' ')}
      >
        <p className="text-sm font-bold text-white">{user.displayName}</p>
        <p className="mt-1 truncate text-xs text-slate-400">{user.email}</p>
        <Button
          className="mt-4 w-full border border-white/15 bg-transparent text-slate-200 ring-0 hover:bg-white/10 hover:text-white"
          variant="secondary"
          onClick={onLogout}
        >
          {t('logout')}
        </Button>
      </div>
    </aside>
  );
};
