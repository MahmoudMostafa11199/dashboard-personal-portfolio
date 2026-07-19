import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCertification } from '../../services/apiCertifications';

export const useDeleteCertification = () => {
  const queryClient = useQueryClient();

  const { mutate: removeCertification, isPending: isDeleting } = useMutation({
    mutationFn: deleteCertification,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });

      toast.success('Certification successfully deleted');
    },

    onError: (err) => toast.error(err?.message),
  });

  return { removeCertification, isDeleting };
};
