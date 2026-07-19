import { HiOutlinePlusCircle } from 'react-icons/hi2';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CertificationOperations from '../features/certifications/CertificationOperations';
import CertificationsList from '../features/certifications/CertificationsList';
import CertificationForm from '../features/certifications/CertificationForm';
import PageHeader from '../ui/PageHeader';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

function Certifications() {
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
        title="Certifications"
        description="Validate your expertise and manage your professional credentials."
      >
        <Modal openOnMount={shouldAutoOpen ? 'add-certification' : undefined}>
          <Modal.Open opens="add-certification">
            <Button
              type="button"
              className="flex items-center justify-center gap-1"
            >
              <HiOutlinePlusCircle size={18} className="stroke-2" />
              <span>Add Certification</span>
            </Button>
          </Modal.Open>

          <Modal.Window name="add-certification">
            <CertificationForm />
          </Modal.Window>
        </Modal>
      </PageHeader>

      <CertificationOperations />

      <CertificationsList />
    </>
  );
}

export default Certifications;
