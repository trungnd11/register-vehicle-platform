import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-sans' }),
  Geist_Mono: () => ({ variable: 'font-mono' }),
}));

import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders the document as Vietnamese', () => {
    const html = renderToStaticMarkup(
      <RootLayout>
        <div>nội dung</div>
      </RootLayout>,
    );

    expect(html).toContain('lang="vi"');
  });
});
