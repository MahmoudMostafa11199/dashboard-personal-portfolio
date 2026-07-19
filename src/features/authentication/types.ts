import type { User, UserInfo } from 'firebase/auth';

export interface LoginCredential {
  email: string;
  password: string;
}

export type CurrentUser = {
  user: User;
  profile: {
    displayName: string;
    email: string;
    bio?: string;
    location?: string;
    phoneNumber?: string;
    githubProfile?: string;
    linkedinUrl?: string;
    photoURL?: string;
  };
  role: 'authenticated';
};

export type ProfileFormInput = {
  displayName: string;
  email: string;
  bio: string;
  location: string;
  phoneNumber: string;
  githubProfile?: string;
  linkedinUrl?: string;
};

export type UserData = UserInfo;
