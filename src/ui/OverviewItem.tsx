import type { ReactNode } from 'react';

type Props = {
  icon: string | React.ReactNode;
  label: string;
  children: ReactNode;
};

function OverviewItem({ icon, label, children }: Props) {
  return (
    <div className="@container w-full flex flex-col @sm:flex-row @sm:items-center gap-1 @sm:gap-2">
      <span className="flex items-center gap-2 text-stone-950 shrink-0 @sm:w-42 dark:text-sky-400">
        {icon}
        <span>{label}</span>
        <span className="@sm:hidden">:</span>
      </span>

      <span className="hidden @sm:inline shrink-0">:</span>

      <div className="text-sm ms-6 @sm:ms-0">{children}</div>
    </div>
  );
}

export default OverviewItem;
