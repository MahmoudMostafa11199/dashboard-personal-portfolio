import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { database } from '../services/firebaseConfig';
import type { ExperienceFormType } from '../features/experiences/types';

const experiencesSeed: ExperienceFormType[] = [
  {
    title: 'MERN Stack Developer Trainee',
    description:
      'Completed an intensive 6-month MERN stack specialization covering frontend architecture, backend API design, authentication, and deployment. Built and defended Avvocato, an Arabic-native AI-powered legal case management SaaS platform for Egyptian lawyers, as part of a 7-person team.',
    type: 'training',
    startDate: Timestamp.fromDate(new Date('2026-01-01')),
    endDate: Timestamp.fromDate(new Date('2026-06-25')),
    current: false,
    company: {
      name: 'Information Technology Institute (ITI)',
      location: 'Mansoura, Egypt',
      workMode: 'hybrid',
      url: 'https://iti.gov.eg',
    },
    skillIds: [
      'A6uU1gM4Gul2Aek7DhY2',
      'raoW7EEKQzTwGuniczrE',
      'BesegElqLlVTAlBG7KZ2',
      'htI3aVUmuwL0Ziy2GzPz',
      'b3hDdzMXmwOOMMbBhoIC',
      '9gLK2bxqY7rFTJc3k8nO',
    ],
  },
];

export const seedExperiences = async () => {
  const collectionRef = collection(database, 'experiences');

  try {
    for (const experience of experiencesSeed) {
      const docData = {
        ...experience,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(collectionRef, docData);
      console.log(`✅ Seeded experience: ${experience.title} (${docRef.id})`);
    }

    console.log('🎉 Done seeding experiences.');
  } catch (err) {
    console.error('❌ Error seeding experiences:', err);
    throw err;
  }
};

seedExperiences();
