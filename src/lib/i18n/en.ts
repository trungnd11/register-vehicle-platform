export interface Dict {
  header: {
    logo: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    contactButton: string;
  };
  form: {
    title: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    noteLabel: string;
    notePlaceholder: string;
    submit: string;
    submitting: string;
  };
  footer: {
    description: string;
    hotline: string;
    copyright: string;
  };
}

export const en: Dict = {
  header: {
    logo: 'Xanh SM',
  },
  hero: {
    badge: 'Recruiting Platform & Partner Drivers',
    title: 'Partner Tỵ Mùi - Green SM Partner - Recruiting Platform and Partner Drivers',
    description: 'Register to become our partner driver. We are looking for Platform drivers and Partner drivers. Leave your information and we will contact you.',
    contactButton: 'Contact now · 039 966 8966',
  },
  form: {
    title: 'Register to apply as a driver',
    description: 'Leave your name and phone number, we will contact you soon.',
    nameLabel: 'Full name',
    namePlaceholder: 'Nguyen Van A',
    phoneLabel: 'Phone number',
    phonePlaceholder: '0912345678',
    noteLabel: 'Note',
    notePlaceholder: 'Enter any additional information if needed.',
    submit: 'Send information',
    submitting: 'Sending...',
  },
  footer: {
    description: 'Partner Tỵ Mùi - Green SM Partner - Recruiting Platform drivers and Partner drivers.',
    hotline: 'Hotline: 039 966 8966',
    copyright: '© 2026 Partner Tỵ Mùi - Đối Tác Green SM.',
  },
};
