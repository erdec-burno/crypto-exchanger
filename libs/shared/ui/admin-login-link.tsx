import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from './cn';

export type AdminLoginLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
};

export const AdminLoginLink = ({
  children = 'Admin login',
  className,
  ...props
}: AdminLoginLinkProps) => {
  return (
    <a
      className={cn(
        'rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};
