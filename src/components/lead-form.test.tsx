import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { LeadForm } from './lead-form';

describe('LeadForm', () => {
  it('renders Vietnamese labels with accents and the submit button', () => {
    const html = renderToStaticMarkup(<LeadForm />);

    expect(html).toContain('Họ và tên');
    expect(html).toContain('Số điện thoại');
    expect(html).toContain('Email');
    expect(html).toContain('Ghi chú');
    expect(html).toContain('Gửi thông tin');
  });
});
