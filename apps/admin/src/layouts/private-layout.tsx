import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  getCurrentAdminUser,
  logoutAdmin,
  refreshAdminSession,
} from '@shared/api-client';
import { ErrorState, SessionExpiryWarningModal, Spinner } from '@shared/ui';

import { PrivateHeader } from '../components/private-header';
import { PrivateSidebar } from '../components/private-sidebar';

export const PrivateLayout = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { t } = useTranslation('admin');
  const meQuery = useQuery({
    queryKey: ['admin-me'],
    queryFn: getCurrentAdminUser,
  });
  const refreshSessionMutation = useMutation({
    mutationFn: refreshAdminSession,
    onError: () => {
      client.clear();
      navigate('/login');
    },
    onSuccess: (user) => {
      client.setQueryData(['admin-me'], user);
    },
  });

  if (meQuery.isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 text-slate-950">
        <main>
          <Spinner />
        </main>
      </div>
    );
  }

  if (meQuery.isError) {
    return <Navigate to="/login" replace />;
  }

  if (!meQuery.data) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100 text-slate-950">
        <main>
          <ErrorState title={t('sessionRestoreError')} />
        </main>
      </div>
    );
  }

  async function handleLogout() {
    await logoutAdmin();
    client.clear();
    navigate('/login');
  }

  return (
    <div className="grid min-h-screen grid-cols-[72px_1fr] bg-slate-100 text-slate-950 lg:grid-cols-[260px_1fr]">
      <PrivateSidebar user={meQuery.data} onLogout={handleLogout} />

      <div className="min-w-0">
        <PrivateHeader user={meQuery.data} />
        <Outlet />
      </div>

      <SessionExpiryWarningModal
        continueDisabled={refreshSessionMutation.isPending}
        continueLabel={
          refreshSessionMutation.isPending
            ? t('sessionExpiry.continuing')
            : t('sessionExpiry.continue')
        }
        description={t('sessionExpiry.description')}
        expiresAt={meQuery.data.sessionExpiresAt}
        onContinue={() => refreshSessionMutation.mutate()}
        title={t('sessionExpiry.title')}
        warningThresholdSeconds={meQuery.data.sessionExpiryWarningSeconds}
      />
    </div>
  );
};
