import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAndUpdateCertification } from '../../services/apiCertifications';
import toast from 'react-hot-toast';

export const useCreateCertification = () => {
  const queryClient = useQueryClient();

  const { mutate: createCertification, isPending: isCreating } = useMutation({
    mutationFn: createAndUpdateCertification,

    onSuccess: () => {
      toast.success('New Certification successfully created');

      queryClient.invalidateQueries({ queryKey: ['certifications'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { createCertification, isCreating };
};
