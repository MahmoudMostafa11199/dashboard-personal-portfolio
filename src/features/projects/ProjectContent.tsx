import { useState } from 'react';
import { Link } from 'react-router';
import { BsArrowUpRight, BsGithub } from 'react-icons/bs';

import type { ProjectType } from './types';
// import { IMAGE_URL } from '../../utils/constants';

import ProjectTabs from './ProjectTabs';
import ProjectOverview from './ProjectOverview';

interface ProjectContectPropa {
  project: ProjectType;
}

function ProjectContent({ project }: ProjectContectPropa) {
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="@container bg-stone-300 p-4 sm:p-6 rounded dark:bg-gray-900">
      <div className="flex flex-col @2xl:flex-row items-start @2xl:items-center justify-between gap-6 mb-6 @2xl:mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl @2xl:text-4xl font-semibold mb-4 @2xl:mb-5">
            {project.title}
          </h2>
          <div className="flex items-center gap-3.5 flex-wrap">
            {project.liveLink && (
              <Link to={project.liveLink} target="_blank">
                <BsArrowUpRight className="text-3xl @2xl:text-4xl border rounded-full p-1.5 transition-colors hover:text-primary-600 hover:bg-stone-200 dark:hover:bg-primary-600 dark:hover:text-stone-200" />
              </Link>
            )}
            {project.githubLink && (
              <Link to={project.githubLink} target="_blank">
                <BsGithub className="text-3xl @2xl:text-4xl rounded-full transition-colors hover:text-primary-600 hover:bg-stone-200 dark:hover:bg-primary-600 dark:hover:text-stone-200" />
              </Link>
            )}
          </div>
        </div>

        <img
          src={`${project.image}?tr=w-800,h-560,c-at_max`}
          alt={project.title}
          className="w-full @2xl:w-auto max-w-full @2xl:max-w-[35rem] max-h-[16rem] @2xl:max-h-[25rem] object-contain"
          loading="lazy"
          width="560"
          height="400"
        />
        {/* <img
          src={`${IMAGE_URL}/projects/optimized/${project.image}?raw=true`}
          alt={project.title}
          className="w-full @2xl:w-auto max-w-full @2xl:max-w-[35rem] max-h-[16rem] @2xl:max-h-[25rem] object-contain"
          loading="lazy"
          width="560"
          height="400"
        /> */}
      </div>

      <div className="overflow-x-auto -mx-4 px-4 @2xl:mx-0 @2xl:px-0">
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

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
        <div className="flex flex-wrap gap-2 sm:gap-3 text-gray-900 dark:text-gray-300">
          {project.technologies.map((tech) => (
            <span
              className="bg-gray-400 dark:bg-gray-800 px-3 py-1 rounded text-xs sm:text-sm"
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
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            No notes yet.
          </p>
        ))}
    </div>
  );
}

export default ProjectContent;
