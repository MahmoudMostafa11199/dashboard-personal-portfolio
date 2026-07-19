import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { MemberFormType, MemberType } from '../features/settings/types';
import { database } from './firebaseConfig';

const collectionRef = collection(database, 'members');

//
export const getMembers = async () => {
  try {
    const dataQuery = query(collectionRef, orderBy('createdAt', 'desc'));

    const res = await getDocs(dataQuery);
    const data = res.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as MemberType,
    );

    return data;

    //
  } catch (err) {
    console.error('Error fetching members:', err);

    throw err;
  }
};

//
export const createAndUpdateMember = async (
  memberData: MemberFormType,
  id?: string,
) => {
  try {
    const trimmedName = memberData.name.trim();

    const duplicateQuery = query(
      collectionRef,
      where('name', '==', trimmedName),
    );
    const duplicateSnapshot = await getDocs(duplicateQuery);

    const isDuplicate = duplicateSnapshot.docs.some((d) => d.id !== id);

    if (isDuplicate) {
      throw new Error(
        'This exact name already exists. Please add a middle or last name to tell members apart.',
      );
    }

    const newMember = {
      ...memberData,
      ...(!id ? { createdAt: Timestamp.now() } : {}),
    };

    // UPDATE
    const memberRef = doc(database, 'members', String(id));
    if (id)
      await updateDoc(memberRef, {
        ...newMember,
        ...(newMember.photoURL
          ? {
              photoURL: `${newMember.photoURL.split('?')[0]}?v=${Date.now()}`,
            }
          : {}),
      });

    // CREATE
    if (!id) await addDoc(collectionRef, newMember);

    return newMember;

    //
  } catch (err) {
    console.error('Error creating member:', err);
    throw err;
  }
};

//
export const deleteMember = async (id: string) => {
  await deleteDoc(doc(database, 'members', id));
};
