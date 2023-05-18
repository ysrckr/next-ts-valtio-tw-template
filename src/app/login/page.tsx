'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { userStore } from '@/stores/userStore';
import type { ChangeEvent, FormEventHandler } from 'react';
import { useSnapshot } from 'valtio';
import { Nexios } from '@/utils/Nexios';

export default function LoginPage() {
  const Nexioss = Nexios.create({ baseURL: 'http://localhost:3000/api' });
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useSnapshot(userStore, { sync: true });

  const addUser = async () => {
    const res = await Nexioss.post('/login', {
      user: user?.name,
      password: user?.password,
    });
    const data = await res;

    if (data) {
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
        Name:
        <input
          type="text"
          name="name"
          autoComplete="off"
          defaultValue={user.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            userStore.name = event.target.value;
          }}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          autoComplete="off"
          defaultValue={user.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            userStore.password = event.target.value;
          }}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
