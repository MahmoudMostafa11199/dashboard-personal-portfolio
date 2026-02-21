import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

import { logout as apiLogout } from '../../services/apiAuth';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: apiLogout,

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'], exact: true });
      toast.success('Logout success');
      navigate('/login', { replace: true });
    },

    onError: (err) => {
      console.log(err.message);
      toast.error(err.message || 'Logout failed. Please try again.');
    },
  });

  return { logout, isLoading };
};
