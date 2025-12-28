import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Inbox } from 'lucide-react';

export interface NoDataFoundProps {
  /**
   * Title text to display
   */
  title?: string;
  /**
   * Description text to display below the title
   */
  description?: string;
  /**
   * Custom icon component (defaults to Inbox icon)
   */
  icon?: LucideIcon;
  /**
   * Size of the icon
   */
  iconSize?: number;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom className for the icon
   */
  iconClassName?: string;
  /**
   * Custom className for the title
   */
  titleClassName?: string;
  /**
   * Custom className for the description
   */
  descriptionClassName?: string;
  /**
   * Optional action button or element to display
   */
  action?: React.ReactNode;
}

/**
 * Reusable NoDataFound component for displaying empty states
 *
 * @example
 * ```tsx
 * <NoDataFound
 *   title="No listings found"
 *   description="Try adjusting your search filters"
 * />
 * ```
 */
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
