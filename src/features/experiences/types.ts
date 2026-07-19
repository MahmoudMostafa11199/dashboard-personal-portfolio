import type { Timestamp } from 'firebase/firestore';

export type ExperienceTypes = 'work' | 'training' | 'internship' | 'other';

export type CompanyType = {
  name: string;
  location?: string;
  workMode: 'onsite' | 'remote' | 'hybrid';
  url?: string;
};

type ExperienceBase = {
  title: string;
  description: string;
  type: ExperienceTypes;
  startDate: Timestamp;
  endDate: Timestamp | null;
  current: boolean;
  company: CompanyType;
  skillIds: string[];
};

export type ExperienceType = ExperienceBase & {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type ExperienceFormType = Omit<
  ExperienceBase,
  'startDate' | 'endDate'
> & {
  startDate: string;
  endDate: string;
};
