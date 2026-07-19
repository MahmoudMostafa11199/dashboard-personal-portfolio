import { HiOutlineTrash, HiPencil } from 'react-icons/hi2';
import Modal from '../../ui/Modal';
import type { MemberType } from './types';
import CreateMemberForm from './CreateMemberForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteMember } from './useDeleteMember';

type TeamMemberProps = {
  member: MemberType;
};

function TeamMember({ member }: TeamMemberProps) {
  const { removeMember, isDeleting } = useDeleteMember();

  return (
    <div
      key={member.id}
      className="w-full sm:flex-1/3 sm:min-w-[220px] flex items-center justify-between gap-3 p-3 shadow"
    >
      <div className="flex items-center gap-2 min-w-0">
        {member.photoURL ? (
          <img
            src={member.photoURL}
            alt={`${member.name} avatar`}
            className="w-9 h-9 rounded-full object-cover object-top overflow-hidden bg-primary-700 shrink-0"
          />
        ) : (
          <div className="w-9 h-9 bg-primary-700 text-white font-semibold text-sm rounded-full uppercase place-content-center text-center shrink-0">
            {member.name
              .split(' ')
              .slice(0, 2)
              .map((n) => n.toLowerCase()[0])
              .join('')}
          </div>
        )}
        <span className="font-medium truncate">{member.name}</span>
      </div>

      <div className="flex gap-3 shrink-0">
        <Modal>
          <Modal.Open opens="edit-member">
            <HiPencil className="size-4 stroke-2 cursor-pointer transition-colors hover:text-sky-500" />
          </Modal.Open>
          <Modal.Open opens="delete-member">
            <HiOutlineTrash className="size-4 stroke-2 cursor-pointer transition-colors hover:text-rose-500" />
          </Modal.Open>

          <Modal.Window name="edit-member">
            <CreateMemberForm memberToEdit={member} />
          </Modal.Window>

          <Modal.Window name="delete-member">
            <ConfirmDelete
              resourceName={member.name}
              onConfirm={() => removeMember(member.id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default TeamMember;
