import { Card } from '@shared/ui';

export const LandingPage = () => {
  return (
    <div className="grid gap-8">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-white md:p-14">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">
          Crypto Exchanger
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
          Fast exchange flows without moving trust decisions into the browser.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Create a quote, review estimated values, and let the backend finalize
          rates, fees, limits, payments, AML, and order status.
        </p>
        <a
          href="/exchange"
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Start exchange
        </a>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        {['Estimated quotes', 'Backend finalization', 'Status tracking'].map(
          (title) => (
            <Card key={title}>
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">
                Prepared for API integration with clear frontend boundaries.
              </p>
            </Card>
          ),
        )}
      </div>
    </div>
  );
};
