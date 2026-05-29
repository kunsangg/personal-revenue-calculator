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
