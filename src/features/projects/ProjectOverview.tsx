import { format } from 'date-fns';
import type { ProjectType } from './types';
import OverviewItem from '../../ui/OverviewItem';
import AssigneeAvatar from '../../ui/AssigneeAvatar';
import { STATUS_STYLES } from '../../utils/constants';

interface ProjectOverviewProps {
  project: ProjectType;
}

function ProjectOverview({ project }: ProjectOverviewProps) {
  const dueDate = project.dueDate?.toDate();
  const startDate = project.startDate?.toDate();
  const endDate = project.endDate?.toDate();
  const projectProgress = (project.completionPercentage! / 100) * 20;

  const statusClass = STATUS_STYLES[project?.status] ?? 'bg-green-800';

  return (
    <div className="text-gray-700 flex flex-col gap-4 dark:text-gray-300">
      {/* status */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon="⭕" label="Status">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${statusClass}`}
          >
            {project.status?.replace('-', ' ').toUpperCase()}
          </span>
        </OverviewItem>
      </div>

      {/* due date */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon="📅" label="Due Date">
          <span>
            {dueDate ? format(dueDate, 'MMM dd yyyy') : 'No due date'}
          </span>
        </OverviewItem>
      </div>

      {/* project progress */}
      {projectProgress && !isNaN(projectProgress) ? (
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
          <OverviewItem icon="📈" label="Project progress">
            <div className="flex items-center gap-2">
              <span>{project.completionPercentage}%</span>
              <div className="w-20 bg-gray-700 rounded-full h-1.5">
                <div
                  className={`bg-blue-500 h-1.5 rounded-full w-${projectProgress}`}
                ></div>
              </div>
            </div>
          </OverviewItem>
        </div>
      ) : (
        ''
      )}

      {/* assignees */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon="👤" label="Assignees">
          <div className="flex flex-wrap items-center gap-4">
            {project.assignees ? (
              project.assignees.map((assignee) => (
                <AssigneeAvatar
                  key={assignee.name}
                  assigneeName={assignee.name}
                  assigneeImage={assignee.avatar}
                />
              ))
            ) : (
              <AssigneeAvatar
                assigneeName="Mahmoud Mostafa"
                assigneeImage="mahmoud.png"
              />
            )}
          </div>
        </OverviewItem>
      </div>

      {/* timeline */}
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <OverviewItem icon="📊" label="Timeline">
          <div className="flex items-center gap-1">
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
