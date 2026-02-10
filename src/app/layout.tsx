import { getValidToken } from '@/lib/verifyAuth';
import Providers from '@/providers/Providers';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({
  variable: '--font-inter',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Florida yacht trader',
  description: 'Hire with trust, Work with confidence.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getValidToken();

  return (
    <html lang="en">
      <body
        className={`${inter.className} max-w-screen overflow-x-hidden antialiased font-inter`}
        suppressHydrationWarning
      >
        <Providers token={token}>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
