export const CERTIFICATION_ISSUERS = [
  // Major MOOC / course platforms
  'Coursera',
  'Udemy',
  'edX',
  'Udacity',
  'Pluralsight',
  'LinkedIn Learning',
  'Skillshare',
  'Codecademy',
  'freeCodeCamp',
  'DataCamp',
  'Khan Academy',

  // Big tech-backed certificates
  'Google',
  'Microsoft',
  'IBM',
  'Meta',
  'Amazon Web Services (AWS)',
  'Google Cloud',
  'HubSpot Academy',

  // Egypt / MENA-specific
  'Information Technology Institute (ITI)',
  'National Telecommunication Institute (NTI)',
  'Information Technology Industry Development Agency, ITIDA',
  'Udacity Egypt (MCIT Scholarships)',
  'Digital Egypt Pioneers Initiative (DEPI)',
  'Sprints',
  'Career 180',
  'المدرسة - Almdrasa',
  'Route Academy',
  'Orange Digital Center',

  // Cloud / infra certifications
  'Microsoft Certified (Azure)',
  'AWS Certified',
  'Google Cloud Certified',
  'Cisco (CCNA/CCNP)',
  'CompTIA',
  'Red Hat',

  // Design / product
  'Google Career Certificates',
  'Google UX Design',
  'Interaction Design Foundation (IxDF)',
  'Figma',

  // Project management / business
  'Project Management Institute (PMI)',
  'Scrum.org',
  'Scrum Alliance',
  'SHRM',

  // Other
  'freelance/Self-paced (No Issuer)',
  'Other',
] as const;

export type CertificationIssuer = (typeof CERTIFICATION_ISSUERS)[number];
