import { cn } from './cn';

export type NavigationMenuItem = {
  to: string;
  label: string;
};

export type NavigationMenuProps = {
  items: NavigationMenuItem[];
  ariaLabel?: string;
  className?: string;
};

export const NavigationMenu = ({
  items,
  ariaLabel = 'Primary navigation',
  className,
}: NavigationMenuProps) => {
  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        'flex gap-4 text-sm font-semibold text-slate-700',
        className,
      )}
    >
      {items.map((item) => (
        <a key={item.to} href={item.to}>
          {item.label}
        </a>
      ))}
    </nav>
  );
};
