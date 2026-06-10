import type { InputHTMLAttributes } from 'react';

import { cn } from './cn';

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200',
        props.className,
      )}
      {...props}
    />
  );
};
