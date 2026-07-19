import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAndUpdateExperience } from '../../services/apiExperiences';
import toast from 'react-hot-toast';

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  const { mutate: createExperience, isPending: isCreating } = useMutation({
    mutationFn: createAndUpdateExperience,

    onSuccess: () => {
      toast.success('New Experience successfully created');
      
      queryClient.invalidateQueries({ queryKey: ['experiences'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { createExperience, isCreating };
};
