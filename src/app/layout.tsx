import './globals.css';
import { Rubik } from 'next/font/google';

import { Header } from '@/components/header';
import { StoreProvider } from '@/stores/storeProvider';

import { store } from '@/stores';
import { fetchUser } from '@/stores/userStore';

const BodyFont = Rubik({ subsets: ['latin'] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await store.dispatch(fetchUser());
  const { user } = store.getState().user;

  return (
    <html lang="en">
      <body className={BodyFont.className}>
        <StoreProvider
          preloadedState={{
            user: {
              user,
            },
          }}
        >
          {/* @ts-expect-error Async Server Component */}
          <Header />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
