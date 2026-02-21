import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { login as apiLogin } from '../../services/apiAuth';

import type { LoginCredential } from './types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoggingIn,
    isError,
    error,
  } = useMutation({
    mutationFn: ({ email, password }: LoginCredential) =>
      apiLogin({ email, password }),

    onSuccess: (user) => {
      if (user && user.user) {
        const userData = { user, role: 'authenticated' };
        queryClient.setQueryData(['user'], userData);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        toast.success(`Welcome to ${user.user.displayName}`);
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Invalid user data received');
      }
    },

    onError: (err) => {
      console.log(err.message);
      toast.error('Provider email or password are incorrect.');
    },
  });

  return { login, isLoggingIn, isError, error };
};
