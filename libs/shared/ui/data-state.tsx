import type { ReactNode } from 'react';

export const Spinner = () => {
  return (
    <div
      className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-950"
      aria-label="Loading"
    />
  );
};

export const EmptyState = ({ title }: { title: string }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-slate-600">
      {title}
    </div>
  );
};

export const ErrorState = ({ title }: { title: string }) => {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
      {title}
    </div>
  );
};

export const DataState = ({ children }: { children: ReactNode }) => {
  return <div className="grid gap-4">{children}</div>;
};
