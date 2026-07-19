import { useSearchParams } from 'react-router';
import CreateSkillForm from '../features/skills/CreateSkillForm';
import SkillOperations from '../features/skills/SkillOperations';
import SkillsList from '../features/skills/SkillsList';
import Modal from '../ui/Modal';
import PageHeader from '../ui/PageHeader';
import { useEffect } from 'react';

function Skills() {
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
      <PageHeader
        title="Skills Management"
        description="Curate and organize your technical expertise and proficiency levels."
      >
        <Modal openOnMount={shouldAutoOpen ? 'add-skill' : undefined}>
          <Modal.Open opens="add-skill">
            <button className="text-white font-semibold bg-primary-700 py-2 px-4 rounded text-sm transition-colors hover:bg-primary-800">
              Add New Skill
            </button>
          </Modal.Open>

          <Modal.Window name="add-skill">
            <CreateSkillForm />
          </Modal.Window>
        </Modal>
      </PageHeader>

      <SkillOperations />

      <div className="container py-6">
        <SkillsList />
      </div>
    </>
  );
}

export default Skills;
