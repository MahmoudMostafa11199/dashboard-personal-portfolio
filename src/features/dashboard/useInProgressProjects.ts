import { useQuery } from '@tanstack/react-query';
import { getInProgressProjects } from '../../services/apiStats';

export function useInProgressProjects() {
  const { data: projects, isPending: isLoading } = useQuery({
    queryKey: ['dashboard', 'in-progress-projects'],

    queryFn: getInProgressProjects,
  });

  return { projects: projects ?? [], isLoading };
}
