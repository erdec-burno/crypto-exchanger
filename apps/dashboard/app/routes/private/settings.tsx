import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'Settings | Crypto Exchange' },
];

const settings = [
  {
    title: 'Email notifications',
    description: 'Receive account and transaction updates by email.',
  },
  {
    title: 'Security alerts',
    description: 'Get notified when a new device accesses your account.',
  },
] as const;

export const SettingsPage = () => {
  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        Preferences
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        Settings
      </h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Manage your workspace preferences. These controls are visual examples
        and are not persisted yet.
      </p>

      <section className="mt-8 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {settings.map((setting) => (
          <label
            className="flex cursor-pointer items-start justify-between gap-6 p-6"
            key={setting.title}
          >
            <span>
              <span className="block font-bold text-slate-950">
                {setting.title}
              </span>
              <span className="mt-1 block text-sm leading-6 text-slate-500">
                {setting.description}
              </span>
            </span>
            <input
              className="mt-1 size-5 accent-cyan-600"
              defaultChecked
              type="checkbox"
            />
          </label>
        ))}
      </section>
    </main>
  );
};

export default SettingsPage;
