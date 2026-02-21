export type ProjectStatus = 'pending' | 'in-progress' | 'completed';

export type Assignee = {
  name: string;
  avatar: string;
};

export type ProjectType = {
  id: string;
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  githubLink?: string;
  liveLink?: string;
  technologies: string[];
  notes?: string;

  dueDate?: FirebaseTimestamp;
  startDate?: FirebaseTimestamp;
  endDate?: FirebaseTimestamp;
  completionPercentage?: number;
  assignees?: Assignee[];
};

export type FirebaseTimestamp = {
  toDate: () => Date;
};

///////////////////////////////
//
export type ProjectFormInput = {
  title: string;
  status: ProjectStatus;
  description: string;
  image: FileList | string;
  completionPercentage: string;
  technologies: string;
  assignees?: string;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  notes?: string;
  githubLink?: string;
  liveLink?: string;
};
