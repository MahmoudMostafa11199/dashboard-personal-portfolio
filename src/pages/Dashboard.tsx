import { HiOutlinePlusCircle } from 'react-icons/hi2';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import PageHeader from '../ui/PageHeader';
import CreateProjectForm from '../features/projects/CreateProjectForm';
import { useUser } from '../features/authentication/useUser';
import { getGreeting } from '../utils/helpers';
import StatsCard from '../features/dashboard/StatsCard';
import RecentProjects from '../features/dashboard/RceentProjects';
import InProgressBreakdown from '../features/dashboard/ProgressRowSkeleton';
import SkillsChart from '../features/dashboard/SkillsChart';
import QuickActions from '../features/dashboard/QuickActions';
import RecentActivity from '../features/dashboard/RecentActivity';

function Dashboard() {
  const { user } = useUser();

  const firstName = user?.displayName?.split(' ')[0] ?? '';

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <PageHeader
        title={`${getGreeting()}, ${firstName} 👋`}
        description={today}
      >
        <Modal>
          <Modal.Open opens="add-project-dashboard">
            <Button
              type="button"
              className="flex items-center justify-center gap-1"
            >
              <HiOutlinePlusCircle size={18} className="stroke-2" />
              <span>Add Project</span>
            </Button>
          </Modal.Open>
          <Modal.Window name="add-project-dashboard">
            <CreateProjectForm />
          </Modal.Window>
        </Modal>
      </PageHeader>

      <StatsCard />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 py-6 md:py-8 pt-0!">
        <div className="space-y-6">
          <RecentProjects />

          <InProgressBreakdown />
        </div>

        <div className="space-y-6">
          <SkillsChart />

          <RecentActivity />

          <QuickActions />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
