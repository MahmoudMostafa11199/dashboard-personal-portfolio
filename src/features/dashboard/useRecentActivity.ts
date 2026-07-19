import { useQuery } from '@tanstack/react-query';
import {
  getLatestProject,
  getLatestSkill,
  getLatestExperience,
  getLatestCertification,
} from '../../services/apiStats';

export function useRecentActivity() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['dashboard', 'recent-activity'],
    queryFn: async () => {
      const [project, skill, experience, certification] = await Promise.all([
        getLatestProject(),
        getLatestSkill(),
        getLatestExperience(),
        getLatestCertification(),
      ]);
      return { project, skill, experience, certification };
    },
  });

  return {
    project: data?.project ?? null,
    skill: data?.skill ?? null,
    experience: data?.experience ?? null,
    certification: data?.certification ?? null,
    isLoading,
  };
}
