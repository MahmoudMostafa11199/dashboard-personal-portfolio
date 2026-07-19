import type { Timestamp } from 'firebase/firestore';
import type { CertificationIssuer } from '../../utils/CertificationsIssuers';

type CertificationBase = {
  title: string;
  issuer: CertificationIssuer;
  description?: string;
  imageURL?: string;
  credentialUrl?: string;
  issueDate: Timestamp;
};

export type CertificationType = CertificationBase & {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type CertificationFormType = Omit<CertificationBase, 'issueDate'> & {
  issueDate: string;
};
