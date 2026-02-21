import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

import type { LoginProps } from './types';
import type { CurrentUser } from '../features/authentication/types';

//
export const login = async function ({ email, password }: LoginProps) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;

    //
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
  }
};

//
export const getCurrentUser = async function (): Promise<CurrentUser | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        unsubscribe();
        if (user) {
          resolve({ user, role: 'authenticated' });
        } else {
          resolve(null);
        }
      },
      (error) => {
        unsubscribe();
        reject(new Error(`Auth state error: ${error.message}`));
      }
    );
  });
};

//
export const logout = async function () {
  try {
    await signOut(auth);

    //
  } catch (err: unknown) {
    if (err instanceof Error) throw new Error(err.message);
  }
};

//
export const update = async function (updateUserData: string) {
  if (!auth.currentUser) throw new Error('No user is currently logged in');

  try {
    await updateProfile(auth.currentUser, {
      photoURL: updateUserData,
    });

    //
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
