import './globals.css';
import { Rubik } from 'next/font/google';

import { Header } from '@/components/header';

const BodyFont = Rubik({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={BodyFont.className}>
        {/* @ts-expect-error Async Server Component */}
        <Header />
        {children}
      </body>
    </html>
  );
}
