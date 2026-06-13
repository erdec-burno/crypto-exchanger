import { useOutletContext, type MetaFunction } from 'react-router';

import type { PrivateLayoutContext } from '../../layouts/private-layout';

export const meta: MetaFunction = () => [
  { title: 'Dashboard | Crypto Exchange' },
];

const summaryCards = [
  { label: 'Active orders', value: '12', detail: '+3 today' },
  { label: 'Monthly volume', value: '$48,920', detail: '+8.4%' },
  { label: 'Open tickets', value: '2', detail: '1 high priority' },
] as const;

export const DashboardPage = () => {
  const { user } = useOutletContext<PrivateLayoutContext>();

  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
          Account overview
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Hello, {user.name}
        </h1>
        <p className="mt-3 text-slate-600">
          Here is a summary of your account activity.
        </p>
      </div>

      <section className="mt-8 grid gap-5 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <article
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            key={card.label}
          >
            <p className="text-sm font-semibold text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-black text-slate-950">
              {card.value}
            </p>
            <p className="mt-2 text-sm font-medium text-cyan-700">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Recent activity
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              Your workspace is ready
            </h2>
          </div>
          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
            All systems operational
          </span>
        </div>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          Replace these placeholder metrics with loaders connected to your real
          backend when the API is available.
        </p>
      </section>
    </main>
  );
};

export default DashboardPage;
