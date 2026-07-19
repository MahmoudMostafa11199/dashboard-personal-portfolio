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
  CertificationFormType,
  CertificationType,
} from '../features/certifications/types';
import { PAGE_SIZE } from '../utils/constants';

const collectionRef = collection(database, 'certifications');

type FilterType = {
  field: string;
  value: string;
  method?: WhereFilterOp;
};
type GetCertificationsApi = {
  filters: FilterType[] | null;
  search: { query: string };
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page?: number;
  };
};

export const getCertifications = async ({
  filters,
  search,
  pagination,
}: GetCertificationsApi): Promise<{
  data: CertificationType[];
  count: number;
  firstDoc: DocumentSnapshot | null;
  lastDoc: DocumentSnapshot | null;
}> => {
  try {
    const { cursor, direction } = pagination;

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
    if (search?.query?.trim()) {
      const trimmedQuery = search.query.trim().toLowerCase();

      const res = await getDocs(query(baseQuery, orderBy('issueDate', 'desc')));
      const data = res.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as CertificationType,
      );

      const filtered = data.filter(
        (certification) =>
          certification.title.trim().toLowerCase().includes(trimmedQuery) ||
          certification.issuer.trim().toLowerCase().includes(trimmedQuery),
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

    // GET TOTAL COUNT
    const countSnapshot = await getCountFromServer(baseQuery);
    const totalCount = countSnapshot.data().count;

    // PAGINATION
    let dataQuery;

    if (direction === 'prev' && cursor) {
      dataQuery = query(
        baseQuery,
        orderBy('issueDate', 'desc'),
        endBefore(cursor),
        limitToLast(PAGE_SIZE),
      );
    } else {
      dataQuery = query(baseQuery, orderBy('issueDate', 'desc'));
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
        }) as CertificationType,
    );

    const firstDoc = res.docs[0] ?? null;
    const lastDoc = res.docs[res.docs.length - 1] ?? null;

    return { data, count: totalCount, firstDoc, lastDoc };

    //
  } catch (err) {
    console.error('FIREBASE ERROR: ', err);

    throw err;
  }
};

//
export const getCertificationIssuers = async () => {
  try {
    const res = await getDocs(collectionRef);
    const data = res.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        }) as CertificationType,
    );

    const issuers = [...new Set(data.map((d) => d.issuer))];

    return issuers;

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};

//
export const createAndUpdateCertification = async (
  certification: CertificationFormType & { imageURL?: string },
  id?: string,
) => {
  try {
    const newCertification = {
      title: certification.title.trim(),
      issuer: certification.issuer.trim(),
      description: certification.description?.trim() || '',
      imageURL: certification.imageURL || '',
      credentialUrl: certification.credentialUrl?.trim() || '',

      issueDate: certification.issueDate
        ? Timestamp.fromDate(new Date(certification.issueDate))
        : null,

      updatedAt: Timestamp.now(),
      ...(id ? {} : { createdAt: Timestamp.now() }),
    };

    // UPDATE
    const certRef = doc(database, 'certifications', String(id));
    if (id) await updateDoc(certRef, newCertification);

    // CREATE
    if (!id) await addDoc(collectionRef, newCertification);

    return newCertification;

    //
  } catch (err) {
    console.error(err);

    throw err;
  }
};

//
export const deleteCertification = async (id: string) => {
  await deleteDoc(doc(database, 'certifications', id));
};
