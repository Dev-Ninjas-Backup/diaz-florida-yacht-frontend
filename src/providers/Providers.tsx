'use client';

import UserProvider from '@/context/UserContext';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
  token: string | null;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <UserProvider>
      <Toaster position="top-center" />
      {children}
    </UserProvider>
  );
};

export default Providers;
