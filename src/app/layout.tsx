// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/provider/page';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Webllix Generate AI Website Design',
  description: 'Create a stunning website effortlessly with AI. Get tailored, responsive designs that perfectly fit your brand—whether it’s a portfolio, online store, or landing page. Beautiful, user-friendly layouts in just minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
