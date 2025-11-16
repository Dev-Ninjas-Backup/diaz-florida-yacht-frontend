
'use client';

import { UserContext } from '@/context/UserContext';
import { isAuthenticated } from '@/lib/auth-utils';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  loadingComponent,
}) => {
  const router = useRouter();
  const userContext = useContext(UserContext);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const hasToken = isAuthenticated();

      if (!hasToken) {
        router.push(redirectTo);
        return;
      }
      if (!userContext?.isLoading) {
        setIsChecking(false);
        if (!userContext?.user) {
          router.push(redirectTo);
        }
      }
    };

    checkAuth();
  }, [userContext?.isLoading, userContext?.user, router, redirectTo]);

  if (isChecking || userContext?.isLoading) {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }

    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export const DefaultLoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center space-y-4">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-gray-700">
          Loading Dashboard...
        </p>
        <p className="text-sm text-gray-500">Please wait</p>
      </div>
    </div>
  </div>
);
