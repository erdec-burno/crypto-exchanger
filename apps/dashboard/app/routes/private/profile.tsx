import { useOutletContext, type MetaFunction } from 'react-router';

import type { PrivateLayoutContext } from '../../layouts/private-layout';

export const meta: MetaFunction = () => [
  { title: 'Profile | Crypto Exchange' },
];

export const ProfilePage = () => {
  const { user } = useOutletContext<PrivateLayoutContext>();

  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
        Account
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
        Profile
      </h1>
      <p className="mt-3 text-slate-600">
        Review the identity associated with this workspace.
      </p>

      <section className="mt-8 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <span className="grid size-16 place-items-center rounded-2xl bg-cyan-100 text-xl font-black text-cyan-800">
            DA
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-950">{user.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold text-slate-500">Full name</dt>
            <dd className="mt-1 font-bold text-slate-950">{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-slate-500">
              Email address
            </dt>
            <dd className="mt-1 font-bold text-slate-950">{user.email}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
};

export default ProfilePage;
