import type { User } from '@shared/types';

type AdminUserAvatarProps = {
  user: User;
};

export const UserAvatar = ({ user }: AdminUserAvatarProps) => {
  const initial = user.displayName.slice(0, 1).toUpperCase();

  return (
    <button
      aria-label={user.displayName}
      className="group relative grid size-10 place-items-center rounded-full bg-slate-950 text-sm font-black text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
      type="button"
    >
      {initial}
      <span className="pointer-events-none absolute right-0 top-12 z-20 w-56 rounded-xl border border-slate-200 bg-white p-3 text-right opacity-0 shadow-lg shadow-slate-950/10 transition group-hover:opacity-100 group-focus:opacity-100">
        <span className="block truncate text-sm font-bold text-slate-950">
          {user.displayName}
        </span>
        <span className="mt-1 block truncate text-xs font-medium text-slate-500">
          {user.email}
        </span>
      </span>
    </button>
  );
};
