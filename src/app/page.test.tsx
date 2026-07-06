import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

import RootPage from './page';

describe('RootPage', () => {
  it('redirects to /vi', async () => {
    const { redirect } = await import('next/navigation');

    try {
      RootPage();
    } catch {
      // redirect() throws NEXT_REDIRECT — expected
    }

    expect(redirect).toHaveBeenCalledWith('/vi');
  });
});
