'use client';

import { NotificationProvider } from '@/context/NotificationContext';
import UserProvider from '@/context/UserContext';
import { VisitorTrackingProvider } from '@/context/VisitorTrackingContext';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
  token: string | null;
}

const Providers = ({ children, token }: ProvidersProps) => {
  return (
    <UserProvider>
      <VisitorTrackingProvider>
        <NotificationProvider token={token}>
          <Toaster position="top-center" />
          {children}
        </NotificationProvider>
      </VisitorTrackingProvider>
    </UserProvider>
  );
};

export default Providers;
