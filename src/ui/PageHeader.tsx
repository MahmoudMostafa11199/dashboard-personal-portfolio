import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl mb-2 sm:mb-3 font-semibold">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="shrink-0 self-start sm:self-auto">{children}</div>
      )}
    </div>
  );
}

export default PageHeader;
