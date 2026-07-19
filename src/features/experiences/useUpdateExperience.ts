import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ExperienceFormType } from './types';
import { createAndUpdateExperience } from '../../services/apiExperiences';
import toast from 'react-hot-toast';

type UpdateExperienceParams = {
  newExperienceData: ExperienceFormType;
  experienceId: string;
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  const { mutate: editExperience, isPending: isEditing } = useMutation({
    mutationFn: ({ newExperienceData, experienceId }: UpdateExperienceParams) =>
      createAndUpdateExperience(newExperienceData, experienceId),

    onSuccess: () => {
      toast.success('Experience successfully edited');

      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editExperience, isEditing };
};
