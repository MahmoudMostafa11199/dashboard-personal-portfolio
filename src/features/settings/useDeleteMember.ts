import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '../../services/apiMembers';
import toast from 'react-hot-toast';

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const { mutate: removeMember, isPending: isDeleting } = useMutation({
    mutationFn: deleteMember,

    onSuccess: () => {
      toast.success('Member deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { removeMember, isDeleting };
};
