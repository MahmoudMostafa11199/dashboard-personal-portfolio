import { useEffect, useState } from 'react';
import {
  HiCircleStack,
  HiCube,
  HiCommandLine,
  HiOutlineTrash,
  HiPaintBrush,
  HiPencil,
  HiServerStack,
} from 'react-icons/hi2';
import type { SkillType } from './types';
import Modal from '../../ui/Modal';
import CreateSkillForm from './CreateSkillForm';
import ConfirmDelete from '../../ui/ConfirmDelete';
import useCountUp from '../../hooks/useCountUp';
import { getProgressGradient, progressColor } from '../../utils/helpers';
import { useDeleteSkill } from './useDeleteSkill';

const ICON_TYPE = {
  frontend: {
    icon: <HiCube size={22} />,
    iconBgColor: 'bg-blue-100 text-blue-600',
  },
  backend: {
    icon: <HiServerStack size={22} />,
    iconBgColor: 'bg-emerald-100 text-emerald-600',
  },
  language: {
    icon: <HiCommandLine size={22} />,
    iconBgColor: 'bg-indigo-100 text-gray-700',
  },
  database: {
    icon: <HiCircleStack size={22} />,
    iconBgColor: 'bg-amber-100 text-amber-600',
  },
  style: {
    icon: <HiPaintBrush size={22} />,
    iconBgColor: 'bg-pink-100 text-pink-600',
  },
} satisfies Record<string, { icon: React.ReactNode; iconBgColor: string }>;

type SkillProps = { skill: SkillType };

function SkillCard({ skill }: SkillProps) {
  const { deletedSkill, isDeleting } = useDeleteSkill();

  const { icon, iconBgColor } = ICON_TYPE[skill.iconType];
  const [width, setWidth] = useState(0);
  const animatedCount = useCountUp(skill?.proficiency);

  const handleDeleteSkill = () => {
    if (!skill?.id) return;

    deletedSkill(skill.id);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setWidth(skill?.proficiency), 100);
    return () => window.clearTimeout(timeout);
  }, [skill?.proficiency]);

  return (
    <div className="px-5 py-6 bg-gray-300 dark:bg-gray-700 rounded-md">
      {/* Icon and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className={`p-2 rounded-md ${iconBgColor}`}>{icon}</div>

        <div className="flex items-center gap-4">
          <Modal>
            <Modal.Open opens="edit-skill">
              <HiPencil className="size-4 stroke-2 cursor-pointer transition-colors hover:text-sky-500" />
            </Modal.Open>

            <Modal.Open opens="delete-skill">
              <HiOutlineTrash className="size-4 stroke-2 cursor-pointer transition-colors hover:text-rose-500" />
            </Modal.Open>

            <Modal.Window name="edit-skill">
              <CreateSkillForm skillToEdit={skill} />
            </Modal.Window>

            <Modal.Window name="delete-skill">
              <ConfirmDelete
                resourceName="skill"
                onConfirm={handleDeleteSkill}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>

      {/* Skill Name */}
      <h3 className="text-xl mb-1 font-semibold">{skill?.name}</h3>
      <p className="text-[11px] uppercase text-primary-500 font-medium tracking-wider mb-4 dark:text-primary-400">
        {skill?.category}
      </p>

      {/* Proficiency */}
      <div className="flex justify-between items-center mb-1">
        <span>Proficiency</span>
        <span className={`font-medium ${progressColor(skill?.proficiency)}`}>
          {animatedCount}%
        </span>
      </div>

      {/* Progress % */}
      <div className="h-1.5 w-full bg-gray-400 rounded-full overflow-hidden mb-4 dark:bg-gray-600">
        <div
          className={`h-full rounded-full bg-linear-to-r ${getProgressGradient(skill?.proficiency)} transition-all duration-1000 ease-linear`}
          style={{ width: `${width}%` }}
        />
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        {skill?.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-200 rounded-lg text-xs dark:bg-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillCard;
