import { useQuery } from '@tanstack/react-query';
import { getAllSkills } from '../../services/apiSkills';

export const useAllSkills = () => {
  const { data: skills, isPending: isLoading } = useQuery({
    queryKey: ['skills', 'all'],

    queryFn: getAllSkills,
  });

  return { skills: skills ?? [], isLoading };
};
