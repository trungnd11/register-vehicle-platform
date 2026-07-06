export interface Dict {
  header: {
    logo: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    submit: string;
    submitting: string;
  };
}

export const en: Dict = {
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
};
