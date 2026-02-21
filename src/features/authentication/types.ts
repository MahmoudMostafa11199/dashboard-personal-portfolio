import type { User } from 'firebase/auth';

export interface LoginCredential {
  email: string;
  password: string;
}

export type CurrentUser = { user: User; role: string } | null;

export type UserData = User;
