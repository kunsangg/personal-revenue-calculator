"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  IndianRupee,
  Package,
  Sparkles,
  TrendingUp,
  Zap,
  Shield,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { landingStats } from "@/lib/seed-data";

const features = [
  {
    icon: Calculator,
    title: "Profit Calculator",
    description:
      "Per-order and monthly profit with COD fees, GST, RTO, returns, and ad spend — built for Indian D2C.",
  },
  {
    icon: Package,
    title: "RTO & Returns Engine",
    description:
      "Quantify reverse shipping, refund impact, and recovery rates. Visual loss meters with severity warnings.",
  },
  {
    icon: BarChart3,
    title: "Ads Analyzer",
    description:
      "CPM, CTR, CAC, ROAS — estimate daily orders and get safe scaling recommendations.",
  },
  {
    icon: IndianRupee,
    title: "GST Calculator",
    description:
      "Inclusive & exclusive GST with CGST/SGST breakdown and post-tax profitability.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Simulator",
    description:
      "Model ad spend scaling with efficiency decay. Find your safe zone before burning cash.",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description:
      "Intelligent recommendations on RTO, CAC, prepaid strategy, and ROAS — powered by your live data.",
  },
];

function AnimatedStat({
  label,
  value,
  suffix,
  delay,
}: {
  label: string;
  value: string;
  suffix: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="text-center"
    >
      <p className="text-3xl font-bold text-zinc-50 sm:text-4xl">
        {value}
        <span className="text-indigo-400">{suffix}</span>
      </p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 overflow-hidden">
      {/* Nav */}
      <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl safe-top">
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-zinc-50">
              Profit<span className="text-indigo-400">OS</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/dashboard">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/app/dashboard">
              <Button size="sm">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-8"
          >
            <IndianRupee className="h-4 w-4" />
            Built for Indian ecommerce sellers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Know your real profit</span>
            <br />
            <span className="text-zinc-100">before you scale ads</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400"
          >
            ProfitOS is the advanced profitability dashboard for dropshipping,
            D2C, and marketplace sellers. RTO, GST, COD, shipping, ads — every
            metric in one premium workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/app/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Start Calculating Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/app/profit-calculator">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Profit Calculator
              </Button>
            </Link>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 mx-auto max-w-5xl rounded-xl border border-white/10 bg-zinc-900/50 p-2 shadow-2xl shadow-indigo-500/10 backdrop-blur"
          >
            <div className="rounded-lg bg-zinc-900 p-6 border border-white/5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Revenue", value: "₹15.6L", color: "text-zinc-100" },
                  { label: "Net Profit", value: "₹3.1L", color: "text-emerald-400" },
                  { label: "ROAS", value: "3.2x", color: "text-indigo-400" },
                  { label: "RTO", value: "22%", color: "text-red-400" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 text-left"
                  >
                    <p className="text-xs text-zinc-500">{m.label}</p>
                    <p className={`text-xl font-semibold mt-1 ${m.color}`}>
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-32 rounded-lg bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-emerald-500/10 flex items-end px-4 pb-4 gap-2">
                {[40, 55, 48, 70, 65, 80, 75].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-indigo-500/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-zinc-900/50 py-16">
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {landingStats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              delay={i * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-50 sm:text-4xl">
              Every metric that matters
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
              12 powerful modules designed specifically for Indian ecommerce
              economics — COD, RTO, GST, and more.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-indigo-500/30 hover:bg-white/[0.05] transition-all"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 group-hover:bg-indigo-500/25 transition-colors">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 px-4 border-t border-white/[0.06]">
        <div className="mx-auto max-w-4xl flex flex-wrap justify-center gap-8 text-zinc-500">
          {[
            { icon: Shield, text: "Local-first data" },
            { icon: LineChart, text: "Real-time calculations" },
            { icon: Zap, text: "PDF export" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4 text-indigo-400" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl text-center rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 p-12">
          <h2 className="text-3xl font-bold text-zinc-50">
            Stop guessing. Start profiting.
          </h2>
          <p className="mt-4 text-zinc-400">
            Join thousands of Indian sellers using ProfitOS to make data-driven
            scaling decisions.
          </p>
          <Link href="/app/dashboard" className="inline-block mt-8">
            <Button size="lg">
              Launch ProfitOS
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 px-4 text-center text-sm text-zinc-600">
        <p>© 2026 ProfitOS. Built for Indian ecommerce sellers.</p>
      </footer>
    </div>
  );
}
