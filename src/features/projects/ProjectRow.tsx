import { useNavigate } from 'react-router';
import type { ProjectType } from './types';

import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateProjectForm from './CreateProjectForm';

import { STATUS_STYLES } from '../../utils/constants';
import { useDeleteProject } from './useDeleteProject';

type Props = {
  project: ProjectType;
  i: number;
};

function ProjectRow({ project, i }: Props) {
  const navigate = useNavigate();
  const { removeProject, isDeleting } = useDeleteProject();

  const statusClass = STATUS_STYLES[project.status] ?? 'bg-green-800';

  const actionButtons = (
    <>
      <button
        className="py-1 px-2 rounded bg-slate-500 transition-colors hover:bg-slate-600"
        onClick={() => navigate(`/projects/${project.id}`)}
      >
        Details
      </button>
      <Modal.Open opens="edit-project">
        <button className="py-1 px-2 rounded bg-blue-400 transition-colors hover:bg-blue-500">
          Edit
        </button>
      </Modal.Open>
      <Modal.Open opens="delete-project">
        <button className="py-1 px-2 rounded bg-rose-700 transition-colors hover:bg-rose-800">
          Delete
        </button>
      </Modal.Open>
    </>
  );

  return (
    <Modal>
      {/* Mobile */}
      <div className="sm:hidden p-3 border-b border-gray-300 dark:border-gray-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            #{String(i + 1).padStart(2, '0')}
          </span>
          <p
            className={`w-fit text-[13px] uppercase font-medium px-2 rounded-4xl ${statusClass}`}
          >
            {project.status}
          </p>
        </div>

        <p className="font-medium">{project.title}</p>

        <div className="text-white text-[15px] flex flex-wrap gap-1.5 pt-1">
          {actionButtons}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid project__item w-full grid-cols-[60px_1fr_120px_220px] gap-4 items-center p-3">
        <p>{String(i + 1).padStart(2, '0')}</p>

        <p className="line-clamp-2" title={project.title}>
          {project.title}
        </p>

        <p
          className={`w-fit text-[13px] uppercase font-medium px-2 rounded-4xl ${statusClass}`}
        >
          {project.status}
        </p>

        <div className="text-white text-[15px] space-x-1.5 whitespace-nowrap">
          {actionButtons}
        </div>
      </div>

      <Modal.Window name="edit-project">
        <CreateProjectForm projectToEdit={project} />
      </Modal.Window>
      <Modal.Window name="delete-project">
        <ConfirmDelete
          resourceName="project"
          onConfirm={() => removeProject(project.id)}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectRow;
