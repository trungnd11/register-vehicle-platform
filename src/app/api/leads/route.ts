import { NextRequest, NextResponse } from 'next/server';

import { type LeadPayload, leadSchema } from '../../../lib/validations/lead';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const UPSTREAM_TIMEOUT_MS = 10_000;

const requestLog = new Map<string, number[]>();

function formatVietnamTimestamp(date: Date): string {
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value || '';

  return `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')}:${get('second')}`;
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = requestLog.get(ip) ?? [];
  const recent = timestamps.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

async function postToGoogleScript(payload: LeadPayload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const response = await fetch(process.env.GOOGLE_SCRIPT_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Upstream responded with ${response.status}`);
    }

    const data = (await response.json()) as { success?: boolean };

    if (!data.success) {
      throw new Error('Upstream reported failure');
    }
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  if (!process.env.GOOGLE_SCRIPT_URL) {
    console.error('Missing GOOGLE_SCRIPT_URL environment variable.');

    return NextResponse.json(
      { success: false, message: 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.' },
      { status: 500 },
    );
  }

  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút.' },
      { status: 429 },
    );
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];

      return NextResponse.json(
        { success: false, message: firstIssue?.message || 'Dữ liệu gửi lên không hợp lệ.' },
        { status: 400 },
      );
    }

    await postToGoogleScript({
      ...parsed.data,
      createdAt: formatVietnamTimestamp(new Date()),
    });

    return NextResponse.json({ success: true, message: 'Gửi thông tin thành công.' });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { success: false, message: 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.' },
        { status: 504 },
      );
    }

    console.error('Lead submission failed:', error);

    return NextResponse.json(
      { success: false, message: 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.' },
      { status: 500 },
    );
  }
}
