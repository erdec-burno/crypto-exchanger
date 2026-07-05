import { Outlet } from 'react-router';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#020617,#0f172a_35%,#e2e8f0_35%)] p-6">
      <main className="mx-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};
