import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createAndUpdateSkill } from '../../services/apiSkills';
import type { SkillFormInput } from './types';

//
type UpdateSkillParams = {
  newSkillData: SkillFormInput;
  skillId: string;
};

export function useUpdateSkill() {
  const queryClient = useQueryClient();

  const { mutate: editSkill, isPending: isEditing } = useMutation({
    mutationFn: ({ newSkillData, skillId }: UpdateSkillParams) =>
      createAndUpdateSkill(newSkillData, skillId),

    onSuccess: () => {
      toast.success('Skill successfully edited');

      queryClient.invalidateQueries({ queryKey: ['skills'] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editSkill, isEditing };
}
