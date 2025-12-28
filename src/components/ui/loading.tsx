import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

export interface LoadingProps {
  /**
   * Loading message text to display
   */
  message?: string;
  /**
   * Size of the spinner icon
   */
  size?: number;
  /**
   * Custom className for the container
   */
  className?: string;
  /**
   * Custom className for the spinner icon
   */
  spinnerClassName?: string;
  /**
   * Custom className for the message text
   */
  messageClassName?: string;
  /**
   * Whether to show full screen loading (centered with min-height)
   */
  fullScreen?: boolean;
  /**
   * Spinner variant: 'spinner' or 'dots'
   */
  variant?: 'spinner' | 'dots';
}

/**
 * Reusable Loading component for displaying loading states
 * 
 * @example
 * ```tsx
 * <Loading message="Loading categories..." />
 * ```
 * 
 * @example
 * ```tsx
 * <Loading fullScreen message="Loading dashboard..." />
 * ```
 */
export function Loading({
  message = 'Loading...',
  size = 48,
  className,
  spinnerClassName,
  messageClassName,
  fullScreen = false,
  variant = 'spinner',
}: LoadingProps) {
  if (variant === 'dots') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-4',
          fullScreen && 'min-h-screen',
          className
        )}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
        </div>
        {message && (
          <p
            className={cn(
              'text-sm md:text-base text-gray-600',
              messageClassName
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-8',
        fullScreen && 'min-h-screen',
        className
      )}
    >
      <Loader2
        className={cn(
          'animate-spin text-primary',
          spinnerClassName
        )}
        size={size}
      />
      {message && (
        <p
          className={cn(
            'text-sm md:text-base text-gray-600',
            messageClassName
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
}

