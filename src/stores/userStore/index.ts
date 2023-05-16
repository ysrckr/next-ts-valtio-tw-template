import { proxy } from 'valtio';
import { UserState } from './User';

export const userStore = proxy<UserState>({
  user: {
    id: 0,
    name: '',
  },
});
