import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  getCountFromServer,
  limit,
  startAfter,
  endBefore,
  limitToLast,
  type DocumentSnapshot,
} from 'firebase/firestore';

import { database } from './firebaseConfig';
import type { ProjectFormInput, ProjectType } from '../features/projects/types';
import { PAGE_SIZE } from '../utils/constants';

////////////////////////////////////////
const collectionRef = collection(database, 'projects');

////////////////////////////////////////
// Get all projects
export type FilterType = {
  field: string;
  value: string;
  method?: '==' | '!=' | '<' | '<=' | '>' | '>=' | 'array-contains';
};

type GetProjectApi = {
  filters: FilterType[] | null;
  sortBy: { field: string; direction: string };
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
  };
};
//
export const getProjects = async ({
  filters,
  sortBy,
  pagination,
}: GetProjectApi): Promise<{
  data: ProjectType[];
  count: number;
  firstDoc: DocumentSnapshot | null;
  lastDoc: DocumentSnapshot | null;
}> => {
  try {
    const { direction, cursor } = pagination;

    let baseQuery = query(collectionRef);

    // FILTER
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        const operator = filter.method || '==';
        baseQuery = query(
          baseQuery,
          where(filter.field, operator, filter.value),
        );
      });
    }

    // SORT
    // if (sortBy) {
    //   const direction = sortBy.direction == 'desc' ? 'desc' : 'asc';
    //   baseQuery = query(baseQuery, orderBy(sortBy.field, direction));
    // }

    // Get TOTAL count
    const countSnapshot = await getCountFromServer(baseQuery);
    const totalCount = countSnapshot.data().count;

    // PAGINATION
    const sortDirection = sortBy.direction === 'desc' ? 'desc' : 'asc';

    let dataQuery;

    if (direction === 'prev' && cursor) {
      dataQuery = query(
        baseQuery,
        orderBy(sortBy.field, sortDirection),
        endBefore(cursor),
        limitToLast(PAGE_SIZE),
      );
    } else {
      dataQuery = query(baseQuery, orderBy(sortBy.field, sortDirection));
      if (direction === 'next' && cursor) {
        dataQuery = query(dataQuery, startAfter(cursor));
      }
      dataQuery = query(dataQuery, limit(PAGE_SIZE));
    }

    //
    const res = await getDocs(dataQuery);
    const data = res.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as ProjectType,
    );

    //
    const firstDoc = res.docs[0] || null;
    const lastDoc = res.docs[res.docs.length - 1] || null;

    return { data, count: totalCount, firstDoc, lastDoc };

    //
  } catch (err) {
    console.error('FIREBASE ERROR:', err);

    throw err;
  }
};

////////////////////////////////////////
// Get single project by id
export const getProjectById = async (id: string): Promise<ProjectType> => {
  try {
    const docRef = doc(database, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Project not found');
    }

    return { ...docSnap.data(), id: docSnap.id } as ProjectType;

    //
  } catch (err) {
    console.error(err);
    throw err;
  }
};

////////////////////////////////////////
// Create and update project
export const createEditProjectApi = async (
  project: ProjectFormInput,
  id?: string,
) => {
  try {
    const newProject = {
      title: project.title.trim(),
      status: project.status,
      description: project.description.trim(),
      image: project.image,
      completionPercentage: Number(project.completionPercentage),
      liveLink: project.liveLink,
      githubLink: project.githubLink,

      technologies: project.technologies
        .split(',')
        .map((tech: string) => tech.trim())
        .filter(Boolean),

      assignees: project.assignees?.map((ass) => ({
        memberId: ass.memberId,
        name: ass.name,
      })),

      startDate: project.startDate
        ? Timestamp.fromDate(new Date(`${project.startDate}T00:00:00`))
        : null,

      endDate: project.endDate
        ? Timestamp.fromDate(new Date(`${project.endDate}T00:00:00`))
        : null,

      dueDate: project.dueDate
        ? Timestamp.fromDate(new Date(`${project.dueDate}T00:00:00`))
        : null,

      notes: project.notes?.trim() || '',
      ...(id ? {} : { createdAt: Timestamp.now() }),
    };

    // UPDATE
    const docRef = doc(database, 'projects', String(id));
    if (id) await updateDoc(docRef, newProject);

    // CREATE
    if (!id) await addDoc(collectionRef, newProject);
    return newProject;

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};

////////////////////////////////////////
// Delete project by id
export const deleteProjectById = async (id: string) => {
  try {
    const docRef = doc(database, 'projects', id);
    await deleteDoc(docRef);

    //
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ///////////////////////////////////
// const queries = [];

// Filter
// if (filters) {
//   Array.isArray(filters)
//     ? filters.map((filter) =>
//         queries.push(
//           where(filter.field, filter.method || '==', filter.value)
//         )
//       )
//     : queries.push(
//         where(filters.field, filters.method || '==', filters.value)
//       );
// }

// Sort
// if (sortBy) {
//   queries.push(orderBy(sortBy.field, sortBy.direction));
// }

// Pagination
// queries =

//
// const q = query(collectionRef,...queries);
// const res = await getDocs(q);
