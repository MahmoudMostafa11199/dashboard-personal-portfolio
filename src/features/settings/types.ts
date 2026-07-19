import type { Timestamp } from 'firebase/firestore';

export type MemberType = {
  id: string;
  name: string;
  photoURL: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type MemberFormType = {
  id?: string;
  name: string;
  photoURL?: string;
};
