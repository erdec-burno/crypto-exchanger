import type { ReactNode } from 'react';

import { cn } from './cn';

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        'rounded-3xl border border-slate-200 bg-white p-6 shadow-sm',
        className,
      )}
    >
      {children}
    </section>
  );
};
