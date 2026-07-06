import { NextRequest } from 'next/server';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route';

describe('POST /api/leads', () => {
  afterEach(() => {
    delete process.env.GOOGLE_SCRIPT_URL;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('returns a safe error when GOOGLE_SCRIPT_URL is missing', async () => {
    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Nguyen Van A',
        phone: '0912345678',
        email: 'a@example.com',
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { success: boolean; message: string };

    expect(response.status).toBe(500);
    expect(data).toEqual({
      success: false,
      message: 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.',
    });
  });

  it('returns success when the payload is valid and upstream succeeds', async () => {
    process.env.GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/test/exec';

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    vi.stubGlobal('fetch', fetchMock);

    const request = new NextRequest('http://localhost:3000/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '203.0.113.10',
      },
      body: JSON.stringify({
        name: 'Nguyen Van A',
        phone: '+84912345678',
        email: 'a@example.com',
        note: 'Khách muốn được gọi lại buổi chiều.',
      }),
    });

    const response = await POST(request);
    const data = (await response.json()) as { success: boolean; message: string };

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    const forwardedBody = JSON.parse(String(requestInit.body)) as {
      name: string;
      phone: string;
      email: string;
      note?: string;
      createdAt: string;
    };

    expect(response.status).toBe(200);
    expect(data).toEqual({ success: true, message: 'Gửi thông tin thành công.' });
    expect(forwardedBody.name).toBe('Nguyen Van A');
    expect(forwardedBody.phone).toBe('0912345678');
    expect(forwardedBody.email).toBe('a@example.com');
    expect(forwardedBody.note).toBe('Khách muốn được gọi lại buổi chiều.');
    expect(forwardedBody.createdAt).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
  });
});
