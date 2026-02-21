import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../../services/apiAuth';
import type { CurrentUser } from './types';

export function useUser() {
  const {
    data: userData,
    isPending: isLoading,
    isError,
    error,
  } = useQuery<CurrentUser, Error>({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const user = userData?.user ?? null;
  const isAuthenticated = !!userData && userData?.role === 'authenticated';

  return { user, isLoading, isAuthenticated, isError, error };
}
