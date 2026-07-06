import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-sans' }),
  Geist_Mono: () => ({ variable: 'font-mono' }),
}));

const mockCookieGet = vi.fn();

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    get: mockCookieGet,
  })),
}));

import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders with Vietnamese lang by default', async () => {
    mockCookieGet.mockReturnValue(undefined);

    const RootLayoutComponent = await RootLayout({ children: <div>nội dung</div> });
    const html = renderToStaticMarkup(RootLayoutComponent);

    expect(html).toContain('lang="vi"');
  });

  it('renders with English lang when cookie is set', async () => {
    mockCookieGet.mockReturnValue({ value: 'en' });

    const RootLayoutComponent = await RootLayout({ children: <div>content</div> });
    const html = renderToStaticMarkup(RootLayoutComponent);

    expect(html).toContain('lang="en"');
  });
});
