import { useState } from 'react';
import { Link } from 'react-router';
import { BsArrowUpRight, BsGithub } from 'react-icons/bs';

import type { ProjectType } from './types';
import { IMAGE_URL } from '../../utils/constants';

import ProjectTabs from './ProjectTabs';
import ProjectOverview from './ProjectOverview';

interface ProjectContectPropa {
  project: ProjectType;
}

function ProjectContent({ project }: ProjectContectPropa) {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="bg-stone-300 p-6 rounded dark:bg-gray-900">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-semibold mb-5">{project.title}</h2>
          <div className="flex items-center gap-3.5">
            {project.liveLink && (
              <Link to={project.liveLink} target="_blank">
                <BsArrowUpRight className="text-4xl border rounded-full p-1.5 transition-colors hover:text-primary-600 hover:bg-stone-200 dark:hover:bg-primary-600 dark:hover:text-stone-200" />
              </Link>
            )}
            {project.githubLink && (
              <Link to={project.githubLink} target="_blank">
                <BsGithub className="text-4xl rounded-full  transition-colors hover:text-primary-600 hover:bg-stone-200 dark:hover:bg-primary-600 dark:hover:text-stone-200" />
              </Link>
            )}
          </div>
        </div>

        <img
          src={`${IMAGE_URL}/projects/optimized/${project.image}?raw=true`}
          alt={project.title}
          className="max-w-[35rem] max-h-[25rem] object-contain"
          loading="lazy"
          width="560"
          height="400"
        />
      </div>

      <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Project Overview */}
      {activeTab == 'overview' && <ProjectOverview project={project} />}

      {/* Project Description */}
      {activeTab == 'description' && (
        <p className="text-gray-700 dark:text-gray-300">
          {project.description}
        </p>
      )}

      {/* Project Technologies  */}
      {activeTab == 'technologies' && (
        <div className="flex flex-wrap gap-3 text-gray-900 dark:text-gray-300">
          {project.technologies.map((tech) => (
            <span
              className="bg-gray-400 dark:bg-gray-800 px-3 py-1 rounded text-sm"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Project Notes  */}
      {activeTab == 'notes' &&
        (project.notes ? (
          <ul className="list-disc list-inside ps-2 space-y-3 text-gray-700 dark:text-gray-300">
            {project.notes.split('\n').map((nt, indx) => (
              <li key={indx} className="pe-4 dark:border-gray-800">
                {nt.trim() || '-'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No notes yet.</p>
        ))}
    </div>
  );
}

export default ProjectContent;
