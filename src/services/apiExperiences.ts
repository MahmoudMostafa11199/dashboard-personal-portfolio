import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  type WhereFilterOp,
} from 'firebase/firestore';
import { database } from './firebaseConfig';
import type {
  ExperienceFormType,
  ExperienceType,
} from '../features/experiences/types';
// import { PAGE_SIZE } from '../utils/constants';

const PAGE_SIZE = 8;

const collectionRef = collection(database, 'experiences');

type FilterType = {
  field: string;
  value: string;
  method?: WhereFilterOp;
};
type GetExperienceApi = {
  filters: FilterType[] | null;
  search: { query: string };
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page?: number;
  };
};

//
export const getExperiences = async ({
  filters,
  search,
  pagination,
}: GetExperienceApi): Promise<{
  data: ExperienceType[];
  count: number;
  firstDoc: DocumentSnapshot | null;
  lastDoc: DocumentSnapshot | null;
}> => {
  try {
    const { direction, cursor } = pagination;

    let baseQuery = query(collectionRef);

    // FILTER
    if (filters) {
      filters.forEach((filter) => {
        const operator = filter.method || '==';
        baseQuery = query(
          baseQuery,
          where(filter.field, operator, filter.value),
        );
      });
    }

    // SEARCH
    if (search.query.trim()) {
      const trimmedQuery = search.query.trim().toLowerCase();

      const res = await getDocs(query(baseQuery, orderBy('createdAt', 'desc')));
      const allData = res.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as ExperienceType,
      );

      const filtered = allData.filter((experience) =>
        experience.title.toLowerCase().includes(trimmedQuery),
      );

      const page = pagination.page ?? 1;
      const start = (page - 1) * PAGE_SIZE;
      const paginated = filtered.slice(start, start + PAGE_SIZE);

      return {
        data: paginated,
        count: filtered.length,
        firstDoc: null,
        lastDoc: null,
      };
    }

    // Get TOTAL count
    const countSnapshot = await getCountFromServer(baseQuery);
    const totalCount = countSnapshot.data().count;

    // PAGINATION
    let dataQuery;

    if (direction === 'prev' && cursor) {
      dataQuery = query(
        baseQuery,
        orderBy('createdAt', 'desc'),
        endBefore(cursor),
        limitToLast(PAGE_SIZE),
      );
    } else {
      dataQuery = query(baseQuery, orderBy('createdAt', 'desc'));
      if (direction === 'next' && cursor) {
        dataQuery = query(dataQuery, startAfter(cursor));
      }
      dataQuery = query(dataQuery, limit(PAGE_SIZE));
    }

    const res = await getDocs(dataQuery);
    const data = res.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as ExperienceType,
    );

    const firstDoc = res.docs[0] ?? null;
    const lastDoc = res.docs[res.docs.length - 1] ?? null;

    return { data, count: totalCount, firstDoc, lastDoc };

    //
  } catch (err) {
    console.error('FIREBASE ERROR:', err);

    throw err;
  }
};

//
export const createAndUpdateExperience = async (
  experience: ExperienceFormType,
  id?: string,
) => {
  try {
    const newExperience = {
      title: experience.title.trim(),
      description: experience.description.trim(),
      type: experience.type,

      company: {
        name: experience.company.name.trim(),
        location: experience.company.location?.trim() || '',
        workMode: experience.company.workMode,
        url: experience.company.url?.trim() || '',
      },

      skillIds: experience.skillIds ?? [],

      current: experience.current,

      startDate: experience.startDate
        ? Timestamp.fromDate(new Date(experience.startDate))
        : null,

      endDate: experience.current
        ? null
        : experience.endDate
          ? Timestamp.fromDate(new Date(experience.endDate))
          : null,

      updatedAt: Timestamp.now(),
      ...(id ? {} : { createdAt: Timestamp.now() }),
    };

    // UPDATE
    const docRef = doc(database, 'experiences', String(id));
    if (id) await updateDoc(docRef, newExperience);

    // CREATE
    if (!id) await addDoc(collectionRef, newExperience);

    return newExperience;

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};

//
export const deleteExperience = async (id: string) => {
  try {
    const docRef = doc(collectionRef, id);
    await deleteDoc(docRef);

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};
