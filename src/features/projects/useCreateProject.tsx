import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { createEditProjectApi } from '../../services/apiProjects';

//
export function useCreateProject() {
  const queryClient = useQueryClient();

  const { mutate: createProject, isPending: isCreating } = useMutation({
    mutationFn: createEditProjectApi,

    onSuccess: () => {
      toast.success('New project successfully created');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createProject, isCreating };
}
