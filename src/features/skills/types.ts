import type { Timestamp } from 'firebase/firestore';

export type IconType =
  | 'frontend'
  | 'backend'
  | 'language'
  | 'database'
  | 'style';

export type SkillType = {
  id: string;
  name: string;
  category: string;
  iconType: IconType;
  categoryFilter: string;
  proficiency: number;
  tags: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export type SkillFormInput = {
  id: string;
  name: string;
  category: string;
  iconType: IconType;
  categoryFilter: string;
  proficiency: string;
  tags?: string;
};
