import { useNavigate } from 'react-router';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import CreateProjectForm from './CreateProjectForm';
import type { ProjectType } from './types';
import { useDeleteProject } from './useDeleteProject';

function ProjectActions({ project }: { project: ProjectType }) {
  const navigate = useNavigate();
  const { removeProject, isDeleting } = useDeleteProject();

  return (
    <Modal>
      <div className="@container font-medium mt-6">
        <div className="flex flex-col @sm:flex-row items-stretch @sm:items-center @sm:justify-end gap-3 @sm:gap-4">
          <Modal.Open opens="edit-project">
            <button className="text-white px-6 py-3 rounded bg-slate-500 transition-colors hover:bg-slate-600">
              Edit
            </button>
          </Modal.Open>

          <Modal.Open opens="delete-project">
            <button className="text-white px-6 py-3 rounded bg-rose-700 transition-colors hover:bg-rose-800">
              Delete
            </button>
          </Modal.Open>

          <button
            className="px-6 py-3 rounded bg-stone-300 transition-colors hover:bg-stone-400 dark:bg-gray-900 dark:hover:bg-gray-930"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      <Modal.Window name="edit-project">
        <CreateProjectForm projectToEdit={project} />
      </Modal.Window>

      <Modal.Window name="delete-project">
        <ConfirmDelete
          resourceName="project"
          disabled={isDeleting}
          onConfirm={() =>
            removeProject(project.id, {
              onSuccess: () => navigate('/projects'),
            })
          }
        />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectActions;
