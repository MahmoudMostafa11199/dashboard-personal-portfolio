import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUser } from '../../services/apiAuth';
import type { ProfileFormInput } from '../authentication/types';

export function useUpdateProfileInfo() {
  const queryClient = useQueryClient();

  const { mutate: updatedUser, isPending: isEditing } = useMutation({
    mutationFn: (updateProfileData: ProfileFormInput) =>
      updateUser(updateProfileData),

    onSuccess: () => {
      toast.success('Profile Info successfully updated');

      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatedUser, isEditing };
}
