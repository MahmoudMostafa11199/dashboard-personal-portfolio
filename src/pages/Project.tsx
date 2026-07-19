import { useParams } from 'react-router';

import { useProject } from '../features/projects/useProject';

import Spinner from '../ui/Spinner';
import ProjectHeader from '../features/projects/ProjectHeader';
import ProjectContent from '../features/projects/ProjectContent';
import ProjectActions from '../features/projects/ProjectActions';

function Project() {
  const { projectId } = useParams<{ projectId?: string }>();

  const { project, isLoading, isError, error } = useProject();

  //////////////////////////////////////
  // Handle loading and error
  if (isLoading) return <Spinner />;

  if (isError && error) return <p className="bg-red-500">{error.message}</p>;

  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="container p-3 mb-4">
      <ProjectHeader project={project} projectId={projectId!} />

      <ProjectContent project={project} />

      <ProjectActions project={project} />
    </div>
  );
}

export default Project;
