import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { database } from '../services/firebaseConfig';

export const migrateAssignees = async () => {
  const projectsRef = collection(database, 'projects');
  const membersRef = collection(database, 'members');

  // جيب كل الـ members
  const membersSnap = await getDocs(membersRef);
  const members = membersSnap.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name as string,
  }));

  // جيب كل الـ projects
  const projectsSnap = await getDocs(projectsRef);

  for (const projectDoc of projectsSnap.docs) {
    const project = projectDoc.data();
    const assignees = project.assignees ?? [];

    const updatedAssignees = assignees.map(
      (ass: { name: string; avatar: string }) => {
        const member = members.find(
          (m) => m.name.toLowerCase() === ass.name.toLowerCase(),
        );
        return {
          name: ass.name,
          memberId: member?.id ?? '',
        };
      },
    );

    await updateDoc(doc(database, 'projects', projectDoc.id), {
      assignees: updatedAssignees,
    });

    console.log(`Updated: ${project.title}`);
  }

  console.log('Migration done! ✅');
};

migrateAssignees();
