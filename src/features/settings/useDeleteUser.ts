import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User,
} from 'firebase/auth';
import { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { database } from '../../services/firebaseConfig';
import toast from 'react-hot-toast';

export const useDeleteUser = (user: User) => {
  const [password, setPassword] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (!password) return;

    setIsDeleting(true);

    try {
      // 1. Reauthenticate
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);

      // 2. Delete Firestore document
      await deleteDoc(doc(database, 'users', user.uid));

      // 3. Delete Firebase Auth account
      await deleteUser(user);

      toast.success('Account deleted successfully');
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('invalid-credential')) {
          toast.error('Incorrect password');
        } else {
          toast.error(err.message);
        }
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    password,
    showConfirm,
    setPassword,
    setShowConfirm,
    isDeleting,
    handleDeleteAccount,
  };
};
