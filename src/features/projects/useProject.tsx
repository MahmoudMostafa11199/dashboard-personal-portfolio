import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { getProjectById } from '../../services/apiProjects';
import type { ProjectType } from './types';

export function useProject() {
  const { projectId } = useParams<{ projectId?: string }>();

  const {
    data: project,
    isPending: isLoading,
    isError,
    error,
  } = useQuery<ProjectType, Error>({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId!),
  });

  return { project, isLoading, isError, error };
}
