import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MemberFormType } from './types';
import { createAndUpdateMember } from '../../services/apiMembers';
import toast from 'react-hot-toast';

type CreateAndUpdateMemberMutationArgs = {
  memberData: MemberFormType;
  id?: string;
};

export const useCreateAndUpdateMember = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createAndUpdateMemberMutation,
    isPending: isCreatingOrUpdating,
  } = useMutation({
    mutationFn: ({ memberData, id }: CreateAndUpdateMemberMutationArgs) =>
      createAndUpdateMember(memberData, id),

    onSuccess: (_, { id }) => {
      toast.success(
        id ? 'Member updated successfully!' : 'Member created successfully!',
      );
      queryClient.invalidateQueries({ queryKey: ['members'] });
    },

    onError: (err) => toast.error(err.message),
  });

  return {
    createAndUpdateMemberMutation,
    isCreatingOrUpdating,
  };
};
