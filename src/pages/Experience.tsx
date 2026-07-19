import { HiOutlinePlusCircle } from 'react-icons/hi2';
import CreateExperienceForm from '../features/experiences/CreateExperienceForm';
import ExperienceOperations from '../features/experiences/ExperienceOperations';
import ExperiencesList from '../features/experiences/ExperiencesList';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { useAllSkills } from '../features/skills/useAllSkills';
import PageHeader from '../ui/PageHeader';
import { useSearchParams } from 'react-router';
import { useEffect } from 'react';

function Experience() {
  const { skills } = useAllSkills();
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
        title="Work & Training Experiences"
        description="A curated timeline of professional growth and technical mastery."
      >
        <Modal openOnMount={shouldAutoOpen ? 'add-experience' : undefined}>
          <Modal.Open opens="add-experience">
            <Button
              type="button"
              className="flex items-center justify-center gap-1"
            >
              <HiOutlinePlusCircle size={18} className="stroke-2" />
              <span>Add Experience</span>
            </Button>
          </Modal.Open>

          <Modal.Window name="add-experience">
            <CreateExperienceForm skills={skills} />
          </Modal.Window>
        </Modal>
      </PageHeader>

      <ExperienceOperations />

      <ExperiencesList skills={skills} />
    </>
  );
}

export default Experience;
