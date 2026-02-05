import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

export interface LoadingProps {
  


  message?: string;
  


  size?: number;
  


  className?: string;
  


  spinnerClassName?: string;
  


  messageClassName?: string;
  


  fullScreen?: boolean;
  


  variant?: 'spinner' | 'dots';
}














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
          className,
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
              messageClassName,
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
        className,
      )}
    >
      <Loader2
        className={cn('animate-spin text-primary', spinnerClassName)}
        size={size}
      />
      {message && (
        <p
          className={cn('text-sm md:text-base text-gray-600', messageClassName)}
        >
          {message}
        </p>
      )}
    </div>
  );
}
