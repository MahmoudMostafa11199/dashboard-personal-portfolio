import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createAndUpdateSkill } from '../../services/apiSkills';

//
export function useCreateSkill() {
  const queryClient = useQueryClient();

  const { mutate: createSkill, isPending: isCreating } = useMutation({
    mutationFn: createAndUpdateSkill,

    onSuccess: () => {
      toast.success('New skill successfully created');
      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createSkill, isCreating };
}
