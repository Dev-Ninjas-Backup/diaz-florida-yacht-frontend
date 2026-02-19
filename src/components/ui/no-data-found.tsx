import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Inbox } from 'lucide-react';

export interface NoDataFoundProps {
  title?: string;

  description?: string;

  icon?: LucideIcon;

  iconSize?: number;

  className?: string;

  iconClassName?: string;

  titleClassName?: string;

  descriptionClassName?: string;

  action?: React.ReactNode;
}

export function NoDataFound({
  title = 'No data found',
  description,
  icon: Icon = Inbox,
  iconSize = 64,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  action,
}: NoDataFoundProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 md:p-12 text-center',
        className,
      )}
    >
      <Icon
        className={cn('text-gray-400 mb-4', iconClassName)}
        size={iconSize}
        strokeWidth={1.5}
      />

      <h3
        className={cn(
          'text-lg md:text-xl font-semibold text-gray-700 mb-2',
          titleClassName,
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            'text-sm md:text-base text-gray-500 max-w-md',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
