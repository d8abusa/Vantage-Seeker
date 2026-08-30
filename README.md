# Vantage Seeker · Quantitative Alpha Engine

> A hedge-fund operating system for researching, backtesting, and deploying cross-asset quantitative strategies.

## Genesis

Vantage Seeker was born from a single question: *What would it look like if the entire compendium of strategies in [Kakushadze & Serur, "151 Trading Strategies" (SSRN-3247865)](https://ssrn.com/abstract=3247865) were available as a modern, interactive research platform?*

The paper is a 361-page encyclopedia of quantitative trading — spanning options, stocks, ETFs, fixed income, foreign exchange, commodities, volatility, structured assets, convertibles, real estate, distressed debt, cash, cryptocurrencies, and global macro. Each strategy includes mathematical formulations, implementation notes, and references. But it is, by design, a static academic reference.

Vantage Seeker turns that reference into a living operating system. It gives traders and researchers a way to browse the strategy universe, inspect formulas, run synthetic backtests, construct multi-strategy portfolios, and analyze risk — all inside a Vantage-inspired dark UI built for speed and clarity.

The name combines two ideas:
- **Vantage** — a point of view; the analytical perspective a quant needs.
- **Seeker** — the active search for alpha across a massive strategy space.

## What it does

### Strategy Universe
Browse **171 cross-asset strategies** derived from SSRN-3247865. Filter by asset class, complexity, and tags. Each strategy card links to a detailed view with descriptions and LaTeX-rendered formulas.

### Strategy Wizard
Select an asset class and ticker, choose a horizon, and let the Wizard simulate every relevant strategy in that class. It ranks them by Sharpe ratio and surfaces the **top 3** candidates for your portfolio.

### Portfolio Builder
Allocate capital across strategies with interactive sliders. Rebalance equal-weight, inspect simulated factor exposure, and view an allocation pie chart with risk/return summary.

### Backtest Lab
Run strategy-aware synthetic simulations. Selecting a strategy auto-loads realistic return/volatility presets by asset class. Adjust capital, timeframe, rebalance frequency, and assumptions. View equity curves and full metrics.

> **Note:** Backtests use Monte Carlo simulation because no live market data feed is connected. Real historical backtests require a data provider integration (Polygon, Alpaca, Bloomberg, etc.).

### Risk Analytics
Inspect portfolio-level risk metrics: VaR, CVaR, beta, stress loss, drawdown history, strategy comparison, and a cross-asset correlation matrix.

### API Connections
Manage data provider keys with service names, endpoints, Swagger/OpenAPI spec URLs, and connection status checks.

### Glossary
Reference key quant terms, acronyms, and notation from the paper.

## Tech stack

- **Vite** + **React 19** + **TypeScript 6**
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **KaTeX** for math rendering
- **Framer Motion** for UI transitions
- **Lucide React** for icons

## Project structure

```
src/
  components/      Layout, navigation, and reusable UI primitives
  data/            strategies.ts — the full strategy universe from SSRN-3247865
  lib/             Utility helpers and backtest simulation engine
  pages/           Dashboard, Wizard, Strategies, Portfolio, Backtest, Analytics, Glossary, Settings
```

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

## Data source

Strategy names, categories, and selected formulas are derived from:

> Zura Kakushadze and Juan Andrés Serur, "151 Trading Strategies," SSRN-3247865, 2018.

This application is a pedagogical frontend; it does not provide investment advice.

## Roadmap

- [ ] Live market data integration via API connections
- [ ] Historical backtesting with real price data
- [ ] Strategy parameter optimization
- [ ] Exportable research reports
- [ ] Multi-account portfolio tracking

## License

See [LICENSE](./LICENSE).
