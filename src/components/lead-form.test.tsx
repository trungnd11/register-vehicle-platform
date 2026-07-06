import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { LeadForm } from './lead-form';
import type { LeadFormTranslations } from './lead-form';

const mockTranslations: LeadFormTranslations = {
  title: 'Đăng ký nhận tư vấn',
  description: 'Vui lòng để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm.',
  nameLabel: 'Họ và tên',
  namePlaceholder: 'Nguyễn Văn A',
  phoneLabel: 'Số điện thoại',
  phonePlaceholder: '0912345678',
  emailLabel: 'Email',
  emailPlaceholder: 'ban@example.com',
  noteLabel: 'Ghi chú',
  notePlaceholder: 'Nhập ghi chú nếu bạn muốn bổ sung thêm thông tin.',
  submit: 'Gửi thông tin',
  submitting: 'Đang gửi...',
};

describe('LeadForm', () => {
  it('renders labels and the submit button', () => {
    const html = renderToStaticMarkup(
      <LeadForm translations={mockTranslations} />,
    );

    expect(html).toContain('Họ và tên');
    expect(html).toContain('Số điện thoại');
    expect(html).toContain('Email');
    expect(html).toContain('Ghi chú');
    expect(html).toContain('Gửi thông tin');
  });
});
