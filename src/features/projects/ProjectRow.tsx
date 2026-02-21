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
  const { deleteProject, isDeleting } = useDeleteProject();

  const statusClass = STATUS_STYLES[project.status] ?? 'bg-green-800';

  return (
    <div className="project__item w-full grid grid-cols-[1fr_1fr_1fr_1fr] gap-4 items-center p-3">
      <p>{String(i + 1).padStart(2, '0')}</p>

      <p>{project.title}</p>

      <p
        className={`w-fit text-[13px] uppercase font-medium px-2 rounded-4xl ${statusClass}`}
      >
        {project.status}
      </p>

      <Modal>
        <div className="text-white text-[15px] space-x-1.5">
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
        </div>

        <Modal.Window name="edit-project">
          <CreateProjectForm projectToEdit={project} />
        </Modal.Window>
        <Modal.Window name="delete-project">
          <ConfirmDelete
            resourceName="project"
            onConfirm={() => deleteProject(project.id)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default ProjectRow;
