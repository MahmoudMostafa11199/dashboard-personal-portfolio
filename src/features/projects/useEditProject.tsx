import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditProjectApi } from '../../services/apiProjects';
import toast from 'react-hot-toast';
import type { ProjectFormInput } from './types';

//
type EditProjectParams = {
  newProjectData: ProjectFormInput;
  projectId: string;
};

export function useEditProject() {
  const queryClient = useQueryClient();

  const { mutate: editProject, isPending: isEditing } = useMutation({
    mutationFn: ({ newProjectData, projectId }: EditProjectParams) =>
      createEditProjectApi(newProjectData, projectId),

    onSuccess: () => {
      toast.success('Project successfully edited');

      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editProject, isEditing };
}
