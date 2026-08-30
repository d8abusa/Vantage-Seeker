# Vantage Seeker · Quantitative Alpha Engine

A quantitative strategy operating system inspired by the Vantage design language and powered by the 151 trading strategies from **Kakushadze & Serur, "151 Trading Strategies" (SSRN-3247865)**.

## What it does

- **Strategy Universe**: Browse 171 cross-asset strategies from the paper, including options, stocks, ETFs, fixed income, FX, commodities, volatility, crypto, and global macro.
- **Mathematical Formulations**: View LaTeX-rendered formulas extracted directly from the paper for key strategies.
- **Portfolio Builder**: Allocate capital across strategies, rebalance, and analyze simulated factor exposure.
- **Backtest Lab**: Run out-of-sample equity-curve simulations with adjustable return/volatility assumptions.
- **Risk Analytics**: Inspect VaR, drawdown, Sharpe, and a cross-asset correlation matrix.
- **Glossary**: Reference key quant terms, acronyms, and notation.

## Tech stack

- Vite + React 19 + TypeScript 6
- Tailwind CSS 4
- Recharts for data visualization
- KaTeX for math rendering
- Framer Motion for UI transitions
- Lucide React icons

## Getting started

```bash
cd vantage-seeker
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/      Layout, navigation, and reusable UI primitives
  data/            strategies.ts — the full strategy universe
  lib/             Utility helpers and backtest simulation engine
  pages/           Dashboard, Wizard, Strategies, Portfolio, Backtest, Analytics, Glossary, Settings
```

## Data source

Strategy names, categories, and selected formulas are derived from:

> Zura Kakushadze and Juan Andrés Serur, "151 Trading Strategies," SSRN-3247865, 2018.

This application is a pedagogical frontend; it does not provide investment advice.
