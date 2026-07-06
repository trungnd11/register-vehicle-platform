import { getTranslations } from '../../lib/i18n';
import { LeadForm } from '../../components/lead-form';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getTranslations(locale);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.2),transparent_32%),linear-gradient(135deg,#020617,#111827_55%,#0f172a)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-fuchsia-300/10 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1 text-sm text-white/70 backdrop-blur-xl">
              {dict.hero.badge}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {dict.hero.title}
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                {dict.hero.description}
              </p>
            </div>
          </div>

          <LeadForm translations={dict.form} />
        </div>
      </section>
    </main>
  );
}
