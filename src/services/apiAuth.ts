import {
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, database } from './firebaseConfig';

import type { LoginProps } from './types';
import type {
  CurrentUser,
  ProfileFormInput,
} from '../features/authentication/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

//
export const login = async function ({ email, password }: LoginProps) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
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
      async (user) => {
        unsubscribe();
        if (user) {
          const docSnap = await getDoc(doc(database, 'users', user.uid));
          const profile = docSnap.exists()
            ? (docSnap.data() as CurrentUser['profile'])
            : ({} as CurrentUser['profile']);

          resolve({ user, profile, role: 'authenticated' });
        } else {
          resolve(null);
        }
      },
      (error) => {
        unsubscribe();
        reject(new Error(`Auth state error: ${error.message}`));
      },
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
export const updateProfilePhoto = async function (photo: string) {
  if (!auth.currentUser) throw new Error('No user is currently logged in');

  try {
    await updateProfile(auth.currentUser, {
      photoURL: photo,
    });

    await updateDoc(doc(database, 'users', auth.currentUser.uid), {
      photoURL: photo,
      updatedAt: new Date().toISOString(),
    });

    //
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
//
export const updateUser = async function (updateUserData: ProfileFormInput) {
  if (!auth.currentUser) throw new Error('No user is currently logged in');

  try {
    await updateProfile(auth.currentUser, {
      ...(updateUserData?.displayName && {
        displayName: updateUserData?.displayName,
      }),
    });

    const userId = auth.currentUser.uid;

    const docRef = doc(database, 'users', userId);
    await updateDoc(docRef, {
      ...updateUserData,
      updatedAt: new Date().toISOString(),
    });

    //
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
