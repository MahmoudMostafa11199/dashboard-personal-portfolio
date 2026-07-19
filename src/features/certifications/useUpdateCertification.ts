import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAndUpdateCertification } from '../../services/apiCertifications';
import toast from 'react-hot-toast';
import type { CertificationFormType } from './types';

type CreateAndUpdateCertificationMutationArgs = {
  updatedCertification: CertificationFormType;
  id: string;
};

export const useUpdateCertification = () => {
  const queryClient = useQueryClient();

  const { mutate: editCertification, isPending: isEditing } = useMutation({
    mutationFn: ({
      updatedCertification,
      id,
    }: CreateAndUpdateCertificationMutationArgs) =>
      createAndUpdateCertification(updatedCertification, id),

    onSuccess: () => {
      toast.success('Certification successfully edited');

      queryClient.invalidateQueries({ queryKey: ['certifications'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return { editCertification, isEditing };
};
