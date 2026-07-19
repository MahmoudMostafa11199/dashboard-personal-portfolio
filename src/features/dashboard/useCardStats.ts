import { useQuery } from '@tanstack/react-query';
import { getCardStats } from '../../services/apiStats';

export function useCardStats() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],

    queryFn: getCardStats,
  });

  return {
    stats: data ?? {
      projectsCount: 0,
      skillsCount: 0,
      experiencesCount: 0,
      certificationsCount: 0,
    },

    isLoading,
  };
}
