import { afterEach, describe, expect, it, vi } from 'vitest';

import { submitLead } from './submit-lead';

describe('submitLead', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns parsed success data when the API succeeds', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Gửi thông tin thành công.' }),
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      submitLead({
        name: 'Nguyen Van A',
        phone: '0912345678',
        note: 'Khách muốn được gọi lại buổi chiều.',
      }),
    ).resolves.toEqual({ success: true, message: 'Gửi thông tin thành công.' });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/leads',
      expect.objectContaining({
        body: JSON.stringify({
          name: 'Nguyen Van A',
          phone: '0912345678',
          note: 'Khách muốn được gọi lại buổi chiều.',
        }),
      }),
    );
  });

  it('throws the API message when the request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, message: 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.' }),
      }),
    );

    await expect(
      submitLead({
        name: 'Nguyen Van A',
        phone: '0912345678',
      }),
    ).rejects.toThrow('Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.');
  });
});
