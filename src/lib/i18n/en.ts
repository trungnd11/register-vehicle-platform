export const en = {
  header: {
    logo: 'Xanh SM',
  },
  hero: {
    badge: 'Register for Xanh SM app consultation',
    title: 'Leave your information for a quick Xanh SM app registration consultation.',
    description: 'Fill in your name, phone, email and notes if needed. We\'ll contact you to support your registration and answer any questions.',
  },
  form: {
    title: 'Register for consultation',
    description: 'Please leave your information, we will contact you soon.',
    nameLabel: 'Full name',
    namePlaceholder: 'Nguyen Van A',
    phoneLabel: 'Phone number',
    phonePlaceholder: '0912345678',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    noteLabel: 'Note',
    notePlaceholder: 'Enter any additional information if needed.',
    submit: 'Send information',
    submitting: 'Sending...',
  },
} as const;

export type Dict = typeof en;
