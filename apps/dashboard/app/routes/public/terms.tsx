import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Terms | Crypto Exchange' }];

export const TermsPage = () => {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        Public page
      </p>
      <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
        Terms of service
      </h1>
      <p className="mt-5 text-sm font-medium text-slate-500">
        Example document, last updated June 13, 2026.
      </p>

      <div className="mt-10 space-y-8 rounded-3xl border border-slate-200 bg-white p-7 leading-7 text-slate-600 sm:p-10">
        <section>
          <h2 className="text-xl font-bold text-slate-950">1. Service usage</h2>
          <p className="mt-3">
            Use the service only for lawful purposes and provide accurate
            information when creating or managing an account.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">
            2. Account security
          </h2>
          <p className="mt-3">
            You are responsible for protecting your credentials and notifying
            support about unauthorized access.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-slate-950">3. Demo notice</h2>
          <p className="mt-3">
            This content is a UI example and is not a production legal
            agreement.
          </p>
        </section>
      </div>
    </main>
  );
};

export default TermsPage;
