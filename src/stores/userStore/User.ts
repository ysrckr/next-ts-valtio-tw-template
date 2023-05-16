export interface User {
  id: number;
  name: string;
  password?: string;
}

export interface UserState {
  user: User;
}
