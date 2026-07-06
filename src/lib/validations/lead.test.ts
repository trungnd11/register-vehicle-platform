import { describe, expect, it } from 'vitest';

import { leadSchema, normalizeVietnamPhone } from './lead';

describe('normalizeVietnamPhone', () => {
  it('keeps local 0-prefix numbers unchanged', () => {
    expect(normalizeVietnamPhone('0912345678')).toBe('0912345678');
  });

  it('converts 84 prefix to local format', () => {
    expect(normalizeVietnamPhone('84912345678')).toBe('0912345678');
  });

  it('converts +84 prefix to local format', () => {
    expect(normalizeVietnamPhone('+84912345678')).toBe('0912345678');
  });
});

describe('leadSchema', () => {
  it('accepts valid lead input', () => {
    const result = leadSchema.safeParse({
      name: 'Nguyen Van A',
      phone: '+84912345678',
      email: 'a@example.com',
    });

    expect(result.success).toBe(true);
  });

  it('rejects blank name', () => {
    const result = leadSchema.safeParse({
      name: '   ',
      phone: '0912345678',
      email: 'a@example.com',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid phone', () => {
    const result = leadSchema.safeParse({
      name: 'Nguyen Van A',
      phone: '12345',
      email: 'a@example.com',
    });

    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = leadSchema.safeParse({
      name: 'Nguyen Van A',
      phone: '0912345678',
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
  });

  it('accepts an empty note', () => {
    const result = leadSchema.safeParse({
      name: 'Nguyen Van A',
      phone: '0912345678',
      email: 'a@example.com',
      note: '',
    });

    expect(result.success).toBe(true);
  });

  it('accepts a missing note', () => {
    const result = leadSchema.safeParse({
      name: 'Nguyen Van A',
      phone: '0912345678',
      email: 'a@example.com',
    });

    expect(result.success).toBe(true);
  });

  it('rejects notes longer than 3000 characters', () => {
    const result = leadSchema.safeParse({
      name: 'Nguyen Van A',
      phone: '0912345678',
      email: 'a@example.com',
      note: 'a'.repeat(3001),
    });

    expect(result.success).toBe(false);
  });
});
