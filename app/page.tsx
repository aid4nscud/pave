"use client";
import { motion } from "framer-motion";
import { ArrowRight, BarChart, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { EarningsSimulator } from "./sections/earnings-simulator";
import { Aurora } from "./sections/Aurora";
import { CarSilhouette } from "./sections/CarSilhouette";
import { SectionReveal, StaggeredReveal } from "./sections/SectionReveal";

export default function Home() {
  return (
    <div className="min-h-dvh w-full">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:glass border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/pave-mark.svg" alt="Pave" className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight">Pave</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#how" className="hover:text-primary transition-colors">How it works</Link>
            <Link href="#sim" className="hover:text-primary transition-colors">Earnings</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
          </nav>
          <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full btn-primary px-4 py-2 transition-colors">
            Join waitlist
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid" />
          <Aurora />
          <CarSilhouette />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight balance">
                <span className="gradient-text">Turn a self-driving car into income.</span>
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl balance">
                Own or finance a self-driving taxi. We deploy and operate it for you. You track results and get paid monthly.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#sim" className="inline-flex items-center justify-center rounded-xl btn btn-primary px-6 py-3.5 text-base">
                   See earnings preview
                </a>
                <a href="#waitlist" className="inline-flex items-center justify-center rounded-xl btn btn-secondary px-6 py-3.5 text-base hover:bg-muted">
                  Join the waitlist
                </a>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="flex items-center gap-8 opacity-70 text-sm">
              <span>As seen in</span>
              <div className="h-6 w-[90px] bg-black/10 rounded" />
              <div className="h-6 w-[90px] bg-black/10 rounded" />
              <div className="h-6 w-[90px] bg-black/10 rounded" />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 sm:pb-20">
            <StaggeredReveal className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.15}>
               <StatCard icon={<Shield className="h-5 w-5 text-primary" />} title="Backed by a utilization floor" value="In eligible cities" />
               <StatCard icon={<Zap className="h-5 w-5 text-primary" />} title="We handle everything" value="Insurance, permits, ops" />
               <StatCard icon={<BarChart className="h-5 w-5 text-primary" />} title="Clear monthly payouts" value="Track results in one place" />
            </StaggeredReveal>
          </div>
        </section>

        <SectionReveal>
          <section id="sim" className="bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:py-12">
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start xl:max-h-[80vh] xl:overflow-hidden">
                <div className="xl:col-span-4 xl:sticky xl:top-24">
                   <h2 className="text-3xl md:text-4xl font-semibold tracking-tight glossy-heading">Earnings preview</h2>
                   <p className="mt-4 text-muted-foreground">
                     Pick a city and scenario. See an illustrative monthly estimate. Join the waitlist for a full plan.
                   </p>
                  <div className="mt-6">
                    <FeatureList />
                  </div>
                </div>
                <div className="xl:col-span-8">
                  <EarningsSimulator />
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <section id="how" className="bg-muted">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight glossy-heading">How it works</h2>
              <StaggeredReveal className="mt-10 grid md:grid-cols-3 gap-6" staggerDelay={0.2}>
                 <StepCard step="01" title="Join the waitlist" text="Tell us your city and timing." />
                 <StepCard step="02" title="Get matched" text="We line up a vehicle and terms for your market." />
                 <StepCard step="03" title="We run it, you earn" text="We deploy and operate. You track results and get paid." />
              </StaggeredReveal>
            </div>
          </section>
        </SectionReveal>

        <section id="waitlist" className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <WaitlistForm />
            <p className="mt-6 text-xs text-muted-foreground">
              Estimates are illustrative and not a guarantee. Availability varies by city and program terms.
            </p>
          </div>
        </section>

        <section id="faq" className="bg-white border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <FAQItem q="Where is this available?" a="Select pilots by city. Join the waitlist to be notified as zones open." />
              <FAQItem q="Do I own the vehicle?" a="Yes. Ownership structures include finance, lease, or revenue-share depending on the program." />
              <FAQItem q="What if utilization drops?" a="Eligible markets include a minimum revenue floor subject to terms." />
              <FAQItem q="What’s included in operations?" a="Insurance, permits, deployment, remote monitoring, cleaning/charging SLAs, and incident response." />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted/60 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Pave</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="gradient-border rounded-2xl p-5 shadow-sm bg-white/70 backdrop-blur card-hover">
      <div className="flex items-center gap-3 text-primary">{icon}<span className="text-sm font-medium">{title}</span></div>
      <div className="mt-2 text-muted-foreground text-sm">{value}</div>
    </div>
  );
}

function FeatureList() {
  const items = [
    { t: "City presets & scenarios", d: "Conservative, Base, Aggressive" },
    { t: "Financing & terms", d: "Loan/lease, rate, downpayment" },
    { t: "Utilization & costs", d: "Hours, network fees, ops bundles" },
  ];
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((i) => (
        <li key={i.t} className="flex items-start gap-3 rounded-xl border border-border p-4">
          <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
          <div>
            <div className="font-medium text-foreground">{i.t}</div>
            <div className="text-sm text-muted-foreground">{i.d}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function StepCard({ step, title, text }: { step: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-white border border-border p-6 card-hover">
      <div className="text-primary font-semibold gradient-text">{step}</div>
      <div className="mt-2 text-lg font-medium text-foreground">{title}</div>
      <div className="mt-1 text-muted-foreground text-sm">{text}</div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <div className="font-medium text-foreground">{q}</div>
      <div className="mt-1 text-sm text-muted-foreground">{a}</div>
    </div>
  );
}

function WaitlistForm() {
  return (
    <form action="/api/waitlist" method="post" className="rounded-2xl border border-border p-6 bg-white">
      <h3 className="text-xl font-semibold">Join the waitlist</h3>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <input required name="email" type="email" placeholder="Email" className="w-full rounded-xl border border-border px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[color-mix(in_oklab,var(--ring)_65%,transparent)]" />
        <input name="city" placeholder="City" className="w-full rounded-xl border border-border px-4 py-3 focus:outline-none focus:ring-4 focus:ring-[color-mix(in_oklab,var(--ring)_65%,transparent)]" />
        <select name="segment" className="w-full rounded-xl border border-border px-4 py-3 bg-white focus:outline-none focus:ring-4 focus:ring-[color-mix(in_oklab,var(--ring)_65%,transparent)]">
          <option value="operator">Operator</option>
          <option value="capital">Capital partner</option>
        </select>
        <select name="timeline" className="w-full rounded-xl border border-border px-4 py-3 bg-white focus:outline-none focus:ring-4 focus:ring-[color-mix(in_oklab,var(--ring)_65%,transparent)]">
          <option value="asap">ASAP</option>
          <option value="3-6m">3–6 months</option>
          <option value=">6m">6+ months</option>
        </select>
      </div>
      <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary text-white px-5 py-3 hover:bg-primary-600 transition-colors">
        Reserve my spot
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
