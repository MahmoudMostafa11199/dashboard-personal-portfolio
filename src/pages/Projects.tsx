import { useSearchParams } from 'react-router';
import CreateProjectForm from '../features/projects/CreateProjectForm';
import ProjectTable from '../features/projects/ProjectTable';
import ProjectTableOperations from '../features/projects/ProjectTableOperations';
import Modal from '../ui/Modal';
import { useEffect } from 'react';

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const shouldAutoOpen = searchParams.get('action') === 'add';

  useEffect(() => {
    if (shouldAutoOpen) {
      searchParams.delete('action');
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">All Projects</h1>

        <ProjectTableOperations />
      </div>

      <div className="container">
        <ProjectTable />

        <Modal openOnMount={shouldAutoOpen ? 'add-project' : undefined}>
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
