import { useQuery } from '@tanstack/react-query';

import { getAdminSettings } from '@shared/api-client';
import { Card } from '@shared/ui';

export const SettingsPage = () => {
  const settingsQuery = useQuery({
    queryKey: ['admin-settings'],
    queryFn: getAdminSettings,
  });

  if (settingsQuery.isLoading) {
    return (
      <Card>
        <h1 className="text-2xl font-black text-slate-950">Settings</h1>
        <p className="mt-2 text-slate-600">Loading settings...</p>
      </Card>
    );
  }

  if (settingsQuery.isError || !settingsQuery.data) {
    return (
      <Card>
        <h1 className="text-2xl font-black text-slate-950">Settings</h1>
        <p className="mt-2 text-red-600">Settings could not be loaded.</p>
      </Card>
    );
  }

  const settings = settingsQuery.data;

  return (
    <Card>
      <h1 className="text-2xl font-black text-slate-950">Settings</h1>
      <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
        <SettingItem
          label="Exchange enabled"
          value={settings.exchangeEnabled ? 'Enabled' : 'Disabled'}
        />
        <SettingItem
          label="Maintenance mode"
          value={settings.maintenanceMode ? 'Enabled' : 'Disabled'}
        />
        <SettingItem
          label="Default fiat currency"
          value={settings.defaultFiatCurrency}
        />
        <SettingItem label="Support email" value={settings.supportEmail} />
        <SettingItem
          label="Session TTL"
          value={`${settings.sessionTtlSeconds} seconds`}
        />
        <SettingItem
          label="Session warning"
          value={`${settings.sessionExpiryWarningSeconds} seconds`}
        />
      </dl>
    </Card>
  );
};

const SettingItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <dt className="text-xs font-semibold uppercase text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-slate-950">{value}</dd>
    </div>
  );
};
