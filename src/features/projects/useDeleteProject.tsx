import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjectById } from '../../services/apiProjects';
import toast from 'react-hot-toast';

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: deleteProjectById,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects'],
      });

      toast.success('Project successfully deleted');
    },

    onError: (err) => toast.error(err.message),
  });

  return { deleteProject, isDeleting };
}
