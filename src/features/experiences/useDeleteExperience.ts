import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteExperience } from '../../services/apiExperiences';

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  const { mutate: removeExperience, isPending: isDeleting } = useMutation({
    mutationFn: deleteExperience,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiences'] });

      toast.success('Experience successfully deleted');
    },

    onError: (err) => toast.error(err?.message),
  });

  return { removeExperience, isDeleting };
};
