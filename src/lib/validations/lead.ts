import { z } from 'zod';

const vietnamPhonePattern = /^0\d{9}$/;

export function normalizeVietnamPhone(input: string): string {
  const compact = input.replace(/\s+/g, '');

  if (compact.startsWith('+84')) {
    return `0${compact.slice(3)}`;
  }

  if (compact.startsWith('84')) {
    return `0${compact.slice(2)}`;
  }

  return compact;
}

export const leadSchema = z.object({
  name: z.string().trim().min(1, 'Vui lòng nhập họ và tên.'),
  phone: z
    .string()
    .trim()
    .transform(normalizeVietnamPhone)
    .refine((value) => vietnamPhonePattern.test(value), 'Số điện thoại không hợp lệ.'),
  note: z.string().trim().max(3000, 'Ghi chú không được vượt quá 3000 ký tự.').optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadPayload = LeadInput & {
  createdAt: string;
};
