'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { userStore } from '@/stores/userStore';
import type { ChangeEvent, FormEventHandler } from 'react';
import { useSnapshot } from 'valtio';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSnapshot(userStore.user);

  const addUser = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
    });
    const { success } = await res.json();

    if (success) {
      const nextUrl = searchParams.get('next');
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push(nextUrl ?? '/');
      router.refresh();
    } else {
      // Make your shiny error handling with a great user experience
      alert('Login failed');
    }
  };

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    addUser();
  };

  return (
    <form onSubmit={handleSubmit}>
      {user?.name && <div>{user.name} from redux</div>}
      <label>
        Username:
        <input
          type="text"
          name="username"
          onChange={(event: ChangeEvent<HTMLInputElement>) => (userStore.user.name = event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => (userStore.user.password = event.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
