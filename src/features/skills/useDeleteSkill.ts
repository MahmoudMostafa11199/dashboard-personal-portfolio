import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSkill } from '../../services/apiSkills';
import toast from 'react-hot-toast';

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  const { mutate: deletedSkill, isPending: isDeleting } = useMutation({
    mutationFn: deleteSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['skills'],
      });

      toast.success('Skill successfully deleted');
    },

    onError: (err) => toast.error(err.message),
  });

  return { deletedSkill, isDeleting };
};
