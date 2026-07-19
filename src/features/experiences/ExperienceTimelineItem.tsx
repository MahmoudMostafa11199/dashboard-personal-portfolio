import { HiOutlineTrash, HiPencil } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import { EXPERIENCE_TYPE_STYLES } from '../../utils/constants';
import { formatTimestamp } from '../../utils/helpers';
import type { SkillType } from '../skills/types';
import CreateExperienceForm from './CreateExperienceForm';
import type { ExperienceType } from './types';
import { useDeleteExperience } from './useDeleteExperience';

function ExperienceTimelineItem({
  experience,
  skills,
}: {
  experience: ExperienceType;
  skills: SkillType[];
}) {
  const style = EXPERIENCE_TYPE_STYLES[experience.type];
  const Icon = style.icon;

  const { removeExperience, isDeleting } = useDeleteExperience();

  // Skills with names
  const skillsNames = skills
    .filter((skill) => experience.skillIds.includes(skill.id))
    .map((sk) => {
      return { name: sk.name, id: sk.id };
    });

  return (
    <div className="bg-white p-4 sm:p-6 rounded-md dark:bg-gray-750 relative">
      <div
        className={`p-1.5 sm:p-2.5 bg-stone-150 flex items-center justify-center rounded-full absolute -left-9 sm:-left-13 top-2 dark:bg-gray-800 border ${style.iconStyle}`}
      >
        <Icon className="text-sm sm:text-base" />
      </div>

      <div className="flex justify-between items-start gap-2 mb-2">
        <div>
          <div className="text-xs text-blue-500 font-medium uppercase dark:text-blue-400 flex flex-col sm:flex-row flex-wrap items-center gap-x-1 gap-y-1">
            <span
              className={`self-start rounded-md px-3 py-0.5 me-2 ${style.className}`}
            >
              {style.label}
            </span>

            <div>
              <time dateTime={experience.startDate.toDate().toISOString()}>
                {formatTimestamp(experience.startDate)}
              </time>
              <span> — </span>
              {!experience.current ? (
                <time dateTime={experience.endDate?.toDate().toISOString()}>
                  {formatTimestamp(experience.endDate!)}
                </time>
              ) : (
                <span>present</span>
              )}
            </div>
          </div>
        </div>

        <Modal>
          <div className="flex items-center gap-4 pe-4 *:cursor-pointer">
            <Modal.Open opens="edit-experience">
              <HiPencil size={18} />
            </Modal.Open>
            <Modal.Open opens="delete-experience">
              <HiOutlineTrash
                size={18}
                className="text-red-800 dark:text-red-600"
              />
            </Modal.Open>
          </div>

          <Modal.Window name="edit-experience">
            <CreateExperienceForm
              experienceToEdit={experience}
              skills={skills}
            />
          </Modal.Window>

          <Modal.Window name="delete-experience">
            <ConfirmDelete
              resourceName="Experience"
              onConfirm={() => removeExperience(experience.id)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold mb-0.5">
        {experience.title}
      </h3>

      <div className="text-sm sm:text-[15.5px] mb-4 flex flex-wrap items-center gap-x-1.5">
        <span>{experience.company.name}</span>
        {experience.company.location && (
          <div>
            <span className="hidden sm:inline"> • </span>
            <span className="text-xs sm:text-sm">
              {experience.company.location}
            </span>
          </div>
        )}
        <span className="hidden sm:inline"> — </span>
        <span className="text-xs sm:text-sm">
          {experience.company.workMode}
        </span>
      </div>

      <p className="text-sm mb-4 line-clamp-3">{experience.description}</p>

      <div className="flex items-center gap-2 flex-wrap">
        {skillsNames.map((skill) => (
          <span
            key={skill.id}
            className="bg-gray-300 py-0.5 px-2.5 rounded-md text-xs sm:text-sm font-medium dark:bg-gray-700"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ExperienceTimelineItem;
