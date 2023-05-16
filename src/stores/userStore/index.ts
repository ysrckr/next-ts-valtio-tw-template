import { proxy } from 'valtio';
import { User } from './User';

export const userStore = proxy<User>({
  id: 0,
  name: '',
  password: '',
});
