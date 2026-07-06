'use client';

import { useState } from 'react';

import { submitLead } from '../lib/api/submit-lead';
import { leadSchema } from '../lib/validations/lead';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: '',
  phone: '',
  email: '',
  note: '',
};

export function LeadForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    const parsed = leadSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};

      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormValues | undefined;

        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }

      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLead(parsed.data);
      setValues(initialValues);
      setErrors({});
      setStatus({ type: 'success', message: result.message });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Không thể gửi dữ liệu lúc này. Vui lòng thử lại sau.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.45)] backdrop-blur-2xl sm:p-8">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-semibold text-white">Đăng ký nhận tư vấn</h2>
        <p className="text-sm leading-6 text-white/70">Vui lòng để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="name">Họ và tên</label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/14"
            placeholder="Nguyễn Văn A"
          />
          {errors.name ? <p className="text-sm text-rose-200">{errors.name}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="phone">Số điện thoại</label>
          <input
            id="phone"
            name="phone"
            value={values.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/14"
            placeholder="0912345678"
          />
          {errors.phone ? <p className="text-sm text-rose-200">{errors.phone}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/14"
            placeholder="ban@example.com"
          />
          {errors.email ? <p className="text-sm text-rose-200">{errors.email}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-white/80" htmlFor="note">Ghi chú</label>
          <textarea
            id="note"
            name="note"
            rows={5}
            value={values.note}
            onChange={(event) => updateField('note', event.target.value)}
            className="w-full resize-y rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-white/35 focus:border-cyan-300/40 focus:bg-white/14"
            placeholder="Nhập ghi chú nếu bạn muốn bổ sung thêm thông tin."
          />
          {errors.note ? <p className="text-sm text-rose-200">{errors.note}</p> : null}
        </div>

        {status.type !== 'idle' ? (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100' : 'border-rose-300/30 bg-rose-300/10 text-rose-100'}`}
            role="status"
          >
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
        </button>
      </form>
    </div>
  );
}
