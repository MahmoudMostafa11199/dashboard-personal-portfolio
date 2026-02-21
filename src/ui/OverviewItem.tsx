import type { ReactNode } from 'react';

type Props = {
  icon: string;
  label: string;
  children: ReactNode;
};

function OverviewItem({ icon, label, children }: Props) {
  return (
    <>
      <span className="text-stone-950 w-39 dark:text-sky-400">
        {icon} {label}
      </span>
      :<div className="ms-4 text-sm">{children}</div>
    </>
  );
}

export default OverviewItem;
