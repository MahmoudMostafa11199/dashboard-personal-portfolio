import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../../services/apiMembers';

export const useMembers = () => {
  const {
    data: members,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
  });

  return {
    members,
    isLoading,
    isError,
    error,
  };
};
