export interface User {
  id: number;
  name: string;
}

export interface UserState {
  user: User | null;
}
