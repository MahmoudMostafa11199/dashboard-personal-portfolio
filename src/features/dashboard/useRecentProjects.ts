import { useQuery } from '@tanstack/react-query';
import { getRecentProjects } from '../../services/apiStats';

export function useRecentProjects() {
  const { data: projects, isPending: isLoading } = useQuery({
    queryKey: ['dashboard', 'recent-projects'],

    queryFn: getRecentProjects,
  });

  return { projects: projects ?? [], isLoading };
}
