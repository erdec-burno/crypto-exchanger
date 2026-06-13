import { Link, useOutletContext, type MetaFunction } from 'react-router';

import type { PublicLayoutContext } from '../../layouts/public-layout';

export const meta: MetaFunction = () => [
  { title: 'Crypto Exchange | Fast and simple digital asset exchange' },
  {
    name: 'description',
    content:
      'A server-rendered landing page for a simple digital asset exchange.',
  },
];

const benefits = [
  {
    title: 'Clear exchange flow',
    description:
      'Review the rate, enter the required details, and track the order from one workspace.',
  },
  {
    title: 'Account overview',
    description:
      'Keep recent activity, profile information, and preferences in a private dashboard.',
  },
  {
    title: 'Human support',
    description:
      'Public support information remains available before and after signing in.',
  },
] as const;

export const PublicIndexPage = () => {
  const { user } = useOutletContext<PublicLayoutContext>();

  return (
    <main>
      <section className="overflow-hidden border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">
              Simple digital exchange
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Exchange assets with a clear path from quote to completion.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A focused exchange experience with transparent steps, order
              tracking, and a private workspace for your account.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200"
                to={user ? '/dashboard' : '/login'}
              >
                {user ? 'Open dashboard' : 'Get started'}
              </Link>
              <Link
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-200"
                to="/support"
              >
                Visit support
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-cyan-200/50 blur-3xl" />
            <div className="relative rounded-3xl border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-300/60 sm:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-400">
                    Exchange preview
                  </p>
                  <p className="mt-1 text-2xl font-black">BTC to USD</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-bold text-emerald-300">
                  Rate locked
                </span>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-slate-400">You send</p>
                  <p className="mt-2 text-3xl font-black">0.125 BTC</p>
                </div>
                <div className="rounded-2xl bg-cyan-400 p-5 text-slate-950">
                  <p className="text-sm font-semibold text-cyan-950/70">
                    You receive
                  </p>
                  <p className="mt-2 text-3xl font-black">$8,420.50</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-400">
                Example values for presentation purposes only.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">
            Built for clarity
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Everything important stays easy to find.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              key={benefit.title}
            >
              <h3 className="text-xl font-bold text-slate-950">
                {benefit.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default PublicIndexPage;
