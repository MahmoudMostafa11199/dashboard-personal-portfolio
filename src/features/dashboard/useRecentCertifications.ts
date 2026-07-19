import { useQuery } from '@tanstack/react-query';
import { getRecentCertifications } from '../../services/apiStats';

export function useRecentCertifications() {
  const { data: certifications, isPending: isLoading } = useQuery({
    queryKey: ['dashboard', 'recent-certifications'],

    queryFn: getRecentCertifications,
  });

  return { certifications: certifications ?? [], isLoading };
}
