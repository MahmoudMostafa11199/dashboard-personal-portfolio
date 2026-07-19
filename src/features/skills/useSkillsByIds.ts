import { useQuery } from '@tanstack/react-query';
import { getSkillsByIds } from '../../services/apiSkills';

export function useSkillsByIds(skillIds: string[]) {
  const { data: skills, isPending: isLoading } = useQuery({
    queryKey: ['skills', 'byIds', skillIds],

    queryFn: () => getSkillsByIds(skillIds),

    enabled: skillIds.length > 0,
  });

  return { skills: skills ?? [], isLoading };
}
