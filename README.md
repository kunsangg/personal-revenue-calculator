# ProfitOS

Advanced ecommerce profitability dashboard for Indian sellers — dropshipping, D2C, and marketplace businesses.

## Features

- **Dashboard** — Revenue, profit, ROAS, CAC, RTO metrics with charts
- **Profit Calculator** — Full per-order economics with PDF export
- **RTO & Returns** — Loss engine with severity warnings
- **Ads Analyzer** — CPM, CTR, CAC, ROAS, scaling recommendations
- **COD vs Prepaid** — Side-by-side comparison engine
- **GST Calculator** — Inclusive/exclusive with CGST/SGST
- **Shipping Calculator** — Zone-based logistics costs
- **Break-even Calculator** — Min price, max ad spend, required ROAS
- **Inventory Tracker** — Dead stock, holding costs, turnover
- **Scaling Simulator** — Ad spend scaling with risk zones
- **AI Insights** — Rule-based intelligent recommendations
- **Settings** — Scenario management, local data persistence

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix primitives)
- Recharts
- Framer Motion
- Zustand + LocalStorage

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/app/dashboard](http://localhost:3000/app/dashboard) for the app.

## Deploy on Vercel

1. Push this repo to GitHub: [kunsangg/personal-revenue-calculator](https://github.com/kunsangg/personal-revenue-calculator)
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Vercel auto-detects **Next.js** — no custom build settings needed
4. (Optional) Add environment variable:
   - `NEXT_PUBLIC_APP_URL` = your production URL (e.g. `https://your-app.vercel.app`)
5. Click **Deploy**

Or use the CLI:

```bash
npm i -g vercel
vercel
```

The app deploys to region `bom1` (Mumbai) by default via `vercel.json` for lower latency for Indian users.

### Mobile

- Responsive layout with sticky header, bottom tab bar, and full module drawer
- iOS safe-area support (notch / home indicator)
- Touch-friendly 48px+ tap targets
- Charts scroll horizontally on small screens
- Add to Home Screen supported via web manifest

## Project Structure

```
src/
  app/              # Pages (landing + dashboard routes)
  components/       # UI, charts, layout, shared
  lib/
    formulas/       # Business calculation engines
    seed-data.ts    # Demo analytics data
    insights.ts     # AI insights rules
    export-pdf.ts   # PDF report export
  store/            # Zustand state + persistence
  types/            # TypeScript interfaces
```
