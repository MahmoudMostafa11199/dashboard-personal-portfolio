import ProjectTableOperations from '../features/projects/ProjectTableOperations';
import ProjectTable from '../features/projects/ProjectTable';
import Modal from '../ui/Modal';
import CreateProjectForm from '../features/projects/CreateProjectForm';

function Projects() {
  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold">All Projects</h1>

        <ProjectTableOperations />
      </div>

      <div className="container">
        <ProjectTable />

        <Modal>
          <Modal.Open opens="add-project">
            <button className="text-white bg-primary-700 mt-4 mb-8 py-2 px-4 rounded text-sm transition-colors hover:bg-primary-800">
              Add New Project
            </button>
          </Modal.Open>

          <Modal.Window name="add-project">
            <CreateProjectForm />
          </Modal.Window>
        </Modal>
      </div>
    </>
  );
}

export default Projects;
