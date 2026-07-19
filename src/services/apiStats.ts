import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { database } from './firebaseConfig';
import type { ProjectType } from '../features/projects/types';
import type { SkillType } from '../features/skills/types';
import type { CertificationType } from '../features/certifications/types';
import type { ExperienceType } from '../features/experiences/types';

const projectsRef = collection(database, 'projects');
const skillsRef = collection(database, 'skills');
const experiencesRef = collection(database, 'experiences');
const certificationsRef = collection(database, 'certifications');

// --- Stats (counts only — no doc data needed, so this is the cheap path) ---
export const getCardStats = async () => {
  try {
    const [
      projectsSnapshot,
      skillsSnapshot,
      experiencesSnapshot,
      certificationsSnapshot,
    ] = await Promise.all([
      getCountFromServer(projectsRef),
      getCountFromServer(skillsRef),
      getCountFromServer(experiencesRef),
      getCountFromServer(certificationsRef),
    ]);

    return {
      projectsCount: projectsSnapshot.data().count,
      skillsCount: skillsSnapshot.data().count,
      experiencesCount: experiencesSnapshot.data().count,
      certificationsCount: certificationsSnapshot.data().count,
    };

    //
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    throw err;
  }
};

// --- Recent projects (latest 4, any status) ---
export const getRecentProjects = async (): Promise<ProjectType[]> => {
  try {
    const q = query(projectsRef, orderBy('startDate', 'desc'), limit(4));
    const res = await getDocs(q);

    return res.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as ProjectType,
    );

    //
  } catch (err) {
    console.error('Error fetching recent projects:', err);
    throw err;
  }
};

// --- In-progress projects only (for the progress breakdown section) ---
export const getInProgressProjects = async (): Promise<ProjectType[]> => {
  try {
    const q = query(
      projectsRef,
      where('status', '==', 'in-progress'),
      orderBy('startDate', 'desc'),
    );
    const res = await getDocs(q);

    return res.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as ProjectType,
    );

    //
  } catch (err) {
    console.error('Error fetching in-progress projects:', err);
    throw err;
  }
};

// --- All skills (lightweight — needed for the category breakdown chart) ---
export const getSkillsForChart = async (): Promise<SkillType[]> => {
  try {
    const res = await getDocs(skillsRef);
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as SkillType);

    //
  } catch (err) {
    console.error('Error fetching skills for chart:', err);
    throw err;
  }
};

// --- Recent certifications (latest 3, for the activity feed) ---
export const getRecentCertifications = async (): Promise<
  CertificationType[]
> => {
  try {
    const q = query(certificationsRef, orderBy('createdAt', 'desc'), limit(3));
    const res = await getDocs(q);

    return res.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as CertificationType,
    );

    //
  } catch (err) {
    console.error('Error fetching recent certifications:', err);
    throw err;
  }
};

// --- Recent Activity feed: latest item from each feature ---
export const getLatestProject = async (): Promise<ProjectType | null> => {
  try {
    const q = query(projectsRef, orderBy('createdAt', 'desc'), limit(1));
    const res = await getDocs(q);
    if (res.empty) return null;
    return { ...res.docs[0].data(), id: res.docs[0].id } as ProjectType;
  } catch (err) {
    console.error('Error fetching latest project:', err);
    throw err;
  }
};

export const getLatestSkill = async (): Promise<SkillType | null> => {
  try {
    const q = query(skillsRef, orderBy('createdAt', 'desc'), limit(1));
    const res = await getDocs(q);
    if (res.empty) return null;
    return { ...res.docs[0].data(), id: res.docs[0].id } as SkillType;
  } catch (err) {
    console.error('Error fetching latest skill:', err);
    throw err;
  }
};

export const getLatestExperience = async (): Promise<ExperienceType | null> => {
  try {
    const q = query(experiencesRef, orderBy('createdAt', 'desc'), limit(1));
    const res = await getDocs(q);
    if (res.empty) return null;
    return { ...res.docs[0].data(), id: res.docs[0].id } as ExperienceType;
  } catch (err) {
    console.error('Error fetching latest experience:', err);
    throw err;
  }
};

export const getLatestCertification =
  async (): Promise<CertificationType | null> => {
    try {
      const q = query(
        certificationsRef,
        orderBy('createdAt', 'desc'),
        limit(1),
      );
      const res = await getDocs(q);
      if (res.empty) return null;
      return {
        ...res.docs[0].data(),
        id: res.docs[0].id,
      } as CertificationType;
    } catch (err) {
      console.error('Error fetching latest certification:', err);
      throw err;
    }
  };
