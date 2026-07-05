// import { useTranslation } from 'react-i18next';

import type { User } from '@shared/types';

import { UserAvatar } from './user-avatar';

type PrivateHeaderProps = {
  user: User;
};

export const PrivateHeader = ({ user }: PrivateHeaderProps) => {
  // const { t } = useTranslation('admin');

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="flex min-h-16 items-center justify-between gap-4 px-5 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            logo
          </p>
          {/*<p className="font-bold text-slate-950">
            {t('navigation.dashboard')}
          </p>*/}
        </div>

        <div className="flex items-center gap-3">
          <UserAvatar user={user} />
        </div>
      </div>
    </header>
  );
};
