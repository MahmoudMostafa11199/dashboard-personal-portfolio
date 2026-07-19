import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateProfilePhoto } from '../../services/apiAuth';

export function useUpdateProfilePhoto() {
  const queryClient = useQueryClient();

  const { mutate: updatedPhoto, isPending: isEditing } = useMutation({
    mutationFn: (photo: string) => updateProfilePhoto(photo),

    onSuccess: () => {
      toast.success('Profile Photo successfully updated');

      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatedPhoto, isEditing };
}
