import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  HiArrowPathRoundedSquare,
  HiCheckCircle,
  HiEllipsisHorizontalCircle,
  HiMiniCalendarDays,
  HiMiniChartBar,
  HiMiniQueueList,
  HiUsers,
} from 'react-icons/hi2';
import useCountUp from '../../hooks/useCountUp';
import AssigneeAvatar from '../../ui/AssigneeAvatar';
import OverviewItem from '../../ui/OverviewItem';
import { STATUS_STYLES } from '../../utils/constants';
import { getProgressGradient, progressColor } from '../../utils/helpers';
import type { ProjectType } from './types';

interface ProjectOverviewProps {
  project: ProjectType;
}

function ProjectOverview({ project }: ProjectOverviewProps) {
  const [width, setWidth] = useState(0);
  const dueDate = project.dueDate?.toDate();
  const startDate = project.startDate?.toDate();
  const endDate = project.endDate?.toDate();
  const projectProgress = (project.completionPercentage! / 100) * 20;
  const animatedCount = useCountUp(project?.completionPercentage || 0);

  const statusClass = STATUS_STYLES[project?.status] ?? 'bg-green-800';

  const statusIcon =
    project?.status === 'completed' ? (
      <HiCheckCircle size={20} />
    ) : project?.status === 'in-progress' ? (
      <HiArrowPathRoundedSquare size={20} />
    ) : (
      <HiEllipsisHorizontalCircle size={20} />
    );

  useEffect(() => {
    const timeout = setTimeout(
      () => setWidth(project.completionPercentage || 0),
      100,
    );
    return () => window.clearTimeout(timeout);
  }, [project.completionPercentage]);

  return (
    <div className="@container text-gray-700 flex flex-col gap-4 dark:text-gray-300">
      {/* status */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon={statusIcon} label="Status">
          <span
            className={`px-2 py-0.5 rounded-full font-medium text-sm ${statusClass}`}
          >
            {project.status?.replace('-', ' ').toUpperCase()}
          </span>
        </OverviewItem>
      </div>

      {/* due date */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon={<HiMiniCalendarDays size={20} />} label="Due Date">
          <span>
            {dueDate ? format(dueDate, 'MMM dd yyyy') : 'No due date'}
          </span>
        </OverviewItem>
      </div>

      {/* project progress */}
      {projectProgress && !isNaN(projectProgress) ? (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <OverviewItem
            icon={<HiMiniChartBar size={20} />}
            label="Project progress"
          >
            <div className="flex items-center gap-2">
              <span
                className={progressColor(project?.completionPercentage || 0)}
              >
                {animatedCount}%
              </span>
              <div className="w-24 sm:w-30 h-1.5 bg-gray-400 rounded-full overflow-hidden dark:bg-gray-600">
                <div
                  className={`h-full rounded-full bg-linear-to-r ${getProgressGradient(project?.completionPercentage || 0)} transition-all duration-1000 ease-linear`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          </OverviewItem>
        </div>
      ) : (
        ''
      )}

      {/* assignees */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon={<HiUsers size={20} />} label="Assignees">
          <div className="flex flex-wrap items-center gap-4">
            {project.assignees ? (
              project.assignees.map((assignee) => (
                <AssigneeAvatar
                  key={assignee.name}
                  assigneeName={assignee.name}
                  memberId={assignee.memberId}
                />
              ))
            ) : (
              <AssigneeAvatar
                assigneeName="Mahmoud Mostafa"
                memberId="assignee.memberId"
              />
            )}
          </div>
        </OverviewItem>
      </div>

      {/* timeline */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon={<HiMiniQueueList size={20} />} label="Timeline">
          <div className="flex items-center gap-1 flex-wrap text-sm">
            <span>
              {startDate ? format(startDate, 'MMM dd yyyy') : 'Start'}
            </span>
            <span className="text-gray-400">—</span>
            <span>{endDate ? format(endDate, 'MMM dd yyyy') : 'End'}</span>
          </div>
        </OverviewItem>
      </div>
    </div>
  );
}

export default ProjectOverview;
