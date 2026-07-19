import { useNavigate } from 'react-router';
import type { ProjectType } from './types';
import { STATUS_STYLES } from '../../utils/constants';

type ProjectHeaderProps = {
  project: ProjectType;
  projectId: string;
};

function ProjectHeader({ projectId, project }: ProjectHeaderProps) {
  const navigate = useNavigate();
  const statusClass = STATUS_STYLES[project.status] ?? 'bg-green-800';

  return (
    <div className="container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-8 mb-6 pe-2">
      <div className="flex flex-wrap items-center gap-3 sm:gap-8">
        <h1 className="text-xl sm:text-3xl font-semibold">
          Project <span className="text-lg sm:text-2xl">#{projectId}</span>
        </h1>
        <p
          className={`text-xs sm:text-sm text-white uppercase font-medium px-2 rounded-4xl ${statusClass}`}
        >
          {project?.status}
        </p>
      </div>

      <button
        className="text-primary-600 self-start sm:self-auto"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
  );
}

export default ProjectHeader;
