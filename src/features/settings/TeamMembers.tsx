import { HiOutlineUserGroup, HiPlus, HiUsers } from 'react-icons/hi2';
import Button from '../../ui/Button';
import { useMembers } from './useMembers';
import TeamMember from './TeamMember';
import TeamMemberSkelton from './TeamMemberSkelton';
import Modal from '../../ui/Modal';
import CreateMemberForm from './CreateMemberForm';
import EmptyState from '../../ui/EmptyState';

export default function TeamMembers() {
  const { members, isLoading } = useMembers();
  const memberCount = Math.max((members?.length ?? 0) - 1, 0);

  return (
    <div className="bg-white shadow-xs py-5 px-4 sm:py-7 sm:px-6 rounded-md dark:bg-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-4">
          <div className="text-teal-700 rounded-md bg-teal-400/10 p-2 dark:text-teal-600 dark:bg-teal-400/10 shrink-0">
            <HiUsers size={28} />
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold">
              Team Members ({memberCount})
            </h3>
            <p className="text-sm">
              Manage people who work with you on projects
            </p>
          </div>
        </div>

        <Modal>
          <Modal.Open opens="add-member">
            <Button
              type="button"
              variation="secondary"
              className="flex items-center justify-center gap-2 text-primary-700 py-2! px-3! w-full sm:w-auto"
            >
              <HiPlus />
              Add Member
            </Button>
          </Modal.Open>

          <Modal.Window name="add-member">
            <CreateMemberForm />
          </Modal.Window>
        </Modal>
      </div>

      <div className="flex items-start flex-wrap gap-y-5 gap-x-4">
        {isLoading && (
          <>
            <TeamMemberSkelton />
            <TeamMemberSkelton />
          </>
        )}

        {!isLoading && memberCount <= 1 && (
          <EmptyState
            icon={HiOutlineUserGroup}
            emptyTitle="No team members yet"
            emptyMessage="Add team members to collaborate on your projects."
          />
        )}

        {!isLoading &&
          memberCount > 1 &&
          members?.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
      </div>
    </div>
  );
}
