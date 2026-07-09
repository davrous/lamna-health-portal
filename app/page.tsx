import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Stethoscope } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

/**
 * Marketing landing page for Lamna Health.
 * This route uses the plain root layout (no portal sidebar). The "Go to my
 * portal" button drops the visitor into the authenticated portal experience.
 */
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <Link
          href="/overview"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
        >
          Sign in
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
            <div>
              <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20">
                Your health, simplified
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Your health coverage, all in one{" "}
                <span className="text-brand-600">calm</span> place.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                Lamna Health brings your plan details, in-network providers, and
                important documents together — clear, private, and always a
                click away.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/overview"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
                >
                  Go to my portal
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/coverage"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  View my coverage
                </Link>
              </div>
            </div>

            {/* Soft decorative panel */}
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-accent-600 p-8 shadow-xl">
                <div className="rounded-2xl bg-white/95 p-6 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Coverage at a glance
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    Lamna Complete Care
                  </p>
                  <p className="text-sm text-slate-500">
                    PPO · Preferred Network
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-2xl font-semibold text-brand-700">
                        $25
                      </p>
                      <p className="text-xs text-slate-500">
                        Primary care copay
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-2xl font-semibold text-brand-700">
                        $1,500
                      </p>
                      <p className="text-xs text-slate-500">Annual deductible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid gap-6 sm:grid-cols-3">
            <FeatureCard
              icon={<ShieldCheck className="h-6 w-6" aria-hidden />}
              title="Coverage at a glance"
              body="See your plan, deductibles, and copays without digging through paperwork."
            />
            <FeatureCard
              icon={<Stethoscope className="h-6 w-6" aria-hidden />}
              title="Find trusted providers"
              body="Search in-network doctors and clinics, and see who's accepting patients."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" aria-hidden />}
              title="Documents on demand"
              body="Grab your ID card, plan summary, and forms whenever you need them."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Lamna Health. A fictitious company.</p>
          <p className="text-xs">
            Demo portal — all member data shown is synthetic and HIPAA-safe.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{body}</p>
    </div>
  );
}
