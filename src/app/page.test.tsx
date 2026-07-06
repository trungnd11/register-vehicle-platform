import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import HomePage from './page';

describe('HomePage', () => {
  it('renders the Xanh SM consultation hero copy', () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain('Đăng ký tư vấn mở app Xanh SM');
    expect(html).toContain('Để lại thông tin để được tư vấn đăng ký mở app Xanh SM nhanh chóng.');
    expect(html).toContain('Điền họ tên, số điện thoại, email và ghi chú nếu cần. Chúng tôi sẽ liên hệ để hỗ trợ bạn đăng ký và giải đáp thông tin liên quan.');
  });
});
