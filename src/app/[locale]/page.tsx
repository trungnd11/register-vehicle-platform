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

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-12 pt-20 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="animate-fade-in-up inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-1 text-sm text-white/70 backdrop-blur-xl">
              {dict.hero.badge}
            </span>
            <div className="animate-fade-in-up-d1 space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {dict.hero.title}
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                {dict.hero.description}
              </p>
            </div>
            <div className="hidden animate-fade-in-up-d2 md:block">
              <a
                href="tel:0399668966"
                className="inline-flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-base font-semibold text-white transition hover:bg-emerald-400/20 hover:border-emerald-400/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 animate-wiggle text-emerald-400">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.022 13.022 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                {dict.hero.contactButton}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up-d2">
            <LeadForm translations={dict.form} />
          </div>
        </div>
      </section>

      <a
        href="tel:0399668966"
        className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 transition active:scale-90 md:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-7">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.022 13.022 0 012 5V3.5z" clipRule="evenodd" />
        </svg>
      </a>
    </main>
  );
}
