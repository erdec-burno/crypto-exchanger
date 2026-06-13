import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [
  { title: 'Support | Crypto Exchange' },
];

export const SupportPage = () => {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        Public page
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
        Support
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Find answers to common questions or contact our support team. This page
        is available without authentication and is rendered on the server.
      </p>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-950">Account access</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Help with sign-in, account settings, and security questions.
          </p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-950">Transactions</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Information about order statuses, rates, and processing times.
          </p>
        </article>
      </section>
    </main>
  );
};

export default SupportPage;
