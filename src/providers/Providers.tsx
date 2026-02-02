'use client';

import { NotificationProvider } from '@/context/NotificationContext';
import UserProvider from '@/context/UserContext';
import { VisitorTrackingProvider } from '@/context/VisitorTrackingContext';

interface ProvidersProps {
  children: React.ReactNode;
  token: string | null;
}

const Providers = ({ children, token }: ProvidersProps) => {
  return (
    <UserProvider>
      <VisitorTrackingProvider>
        <NotificationProvider token={token}>
          {children}
        </NotificationProvider>
      </VisitorTrackingProvider>
    </UserProvider>
  );
};

export default Providers;
