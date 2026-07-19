import { collection, addDoc, Timestamp } from 'firebase/firestore';
import type { SkillType } from '../features/skills/types';
import { database } from '../services/firebaseConfig';

const mockSkills: SkillType[] = [
  {
    id: '2',
    name: 'TypeScript',
    category: 'Static Typing',
    iconType: 'language',
    categoryFilter: 'frontend',
    proficiency: 75,
    tags: ['Generics', 'Type Inference'],
  },
  {
    id: '3',
    name: 'Node.js',
    category: 'Backend Runtime',
    iconType: 'backend',
    categoryFilter: 'backend',
    proficiency: 80,
    tags: ['Express', 'REST APIs'],
  },
  {
    id: '4',
    name: 'MongoDB',
    category: 'Database',
    iconType: 'database',
    categoryFilter: 'database',
    proficiency: 80,
    tags: ['Mongoose', 'Aggregation'],
  },
  {
    id: '6',
    name: 'Tailwind CSS',
    category: 'Styling',
    iconType: 'style',
    categoryFilter: 'other',
    proficiency: 90,
    tags: ['Responsive', 'RTL'],
  },
  {
    id: '7',
    name: 'Next.js',
    category: 'Frontend Framework',
    iconType: 'frontend',
    categoryFilter: 'frontend',
    proficiency: 80,
    tags: ['SSR', 'SSG', 'Folder Structure'],
  },
];

const seedSkills = async () => {
  const collectionRef = collection(database, 'skills');

  for (const skill of mockSkills) {
    const { id, ...skillData } = skill;
    await addDoc(collectionRef, {
      ...skillData,
      createdAt: Timestamp.now(),
    });
    console.log(`Added: ${skill.name}`);
    console.log(id);
  }

  console.log('Done!');
};

seedSkills();
