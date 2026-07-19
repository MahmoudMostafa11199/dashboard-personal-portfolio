import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
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
import type { SkillFormInput, SkillType } from '../features/skills/types';
import { PAGE_SIZE } from '../utils/constants';
import { database } from './firebaseConfig';

const collectionRef = collection(database, 'skills');

type FilterType = {
  field: string;
  value: string;
  method?: WhereFilterOp;
};
type GetSkillApi = {
  filters: FilterType[] | null;
  search: { query: string };
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page?: number;
  };
};
export const getSkills = async ({
  filters,
  search,
  pagination,
}: GetSkillApi): Promise<{
  data: SkillType[];
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

    // SEARCH
    if (search.query.trim()) {
      const trimmedQuery = search.query.trim().toLowerCase();

      const res = await getDocs(query(baseQuery, orderBy('createdAt', 'desc')));
      const allData = res.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as SkillType,
      );

      const filtered = allData.filter((skill) =>
        skill.name.toLowerCase().includes(trimmedQuery),
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
        }) as SkillType,
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
export const getSkillsByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];

  try {
    const chunkSize = 30;
    const chunks: string[][] = [];

    for (let i = 0; i < ids.length; i += chunkSize) {
      chunks.push(ids.slice(i, i + chunkSize));
    }

    const results = await Promise.all(
      chunks.map((chunk) => {
        const q = query(collectionRef, where(documentId(), 'in', chunk));
        return getDocs(q);
      }),
    );

    const data = results.flatMap((snapshot) =>
      snapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          }) as SkillType,
      ),
    );

    return data;

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const getAllSkills = async () => {
  try {
    const res = getDocs(collectionRef);
    const data = (await res).docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as SkillType,
    );

    return data;

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};

//
export const createAndUpdateSkill = async (
  skill: SkillFormInput,
  id?: string,
) => {
  try {
    const newSkill = {
      ...skill,
      proficiency: +skill.proficiency,
      tags: skill.tags
        ?.split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      ...(id ? {} : { createdAt: Timestamp.now() }),
    };

    // UPDATE
    const docRef = doc(database, 'skills', String(id));
    if (id) await updateDoc(docRef, newSkill);

    // CREATE
    if (!id) await addDoc(collectionRef, newSkill);
    return newSkill;

    //
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const docRef = doc(database, 'skills', id);
    await deleteDoc(docRef);

    //
  } catch (err) {
    console.error(err);
    throw err;
  }
};
