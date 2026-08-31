# Vantage Seeker — Agent Operating Manual

> Read this file first. It is the single source of truth for how the system is organized, what each layer promises, and where the traps are.

## One-sentence purpose

Vantage Seeker is a **strategy catalog and simulation workbench** built on the 171 strategies transcribed from Kakushadze & Serur, *151 Trading Strategies* (SSRN-3247865). It lets a user browse the catalog, run synthetic or historical simulations, build toy portfolios, and inspect risk metrics — but it does not trade live money.

## Abstraction tower

Think of the codebase as six layers. Each layer depends only on the layer below it and exposes a typed contract.

| Layer | Path | Responsibility | Contract |
|-------|------|----------------|----------|
| **L0 Sources** | `src/lib/data/`, `src/data/strategies.ts` | External/reference inputs | Frozen paper; optional Yahoo Finance; API configs stored in `localStorage` |
| **L1 Catalog** | `src/data/strategies.ts`, `src/lib/config.ts` | Strategy reference data + system assumptions | 171 strategies; presets; hardcoded constants |
| **L2 Signals** | `src/lib/backtest.ts` | Map a strategy category to a simple price-overlay rule | `selectSignalType(category) → SignalType` |
| **L3 Engines** | `src/lib/engines.ts` | Run simulations or historical overlays deterministically | `runSimulationEngine`, `runHistoricalEngine`, `runPortfolioEngine` |
| **L4 Results** | return values of engines | Provenance-tagged result objects | `BacktestResult` / `PortfolioResult` with `provenance` and `assumptions` fields |
| **L5 Analytics** | `src/lib/simulation.ts`, `src/lib/backtest.ts` | Metric computations (Sharpe, drawdown, etc.) | Derived from L4; cosmetic metrics are explicitly labeled |
| **L6 Presentation** | `src/pages/*`, `src/components/*` | React UI; read-only consumers of L4/L5 | Must not invent numbers; must display provenance |

## Operational modes

The system is always in exactly one of these modes. The mode determines what "data feeds live" actually means.

| Mode | Trigger | What is real | What is synthetic | What is cosmetic |
|------|---------|--------------|-------------------|------------------|
| `research` | Browsing Strategies / StrategyDetail / Glossary | Strategy metadata, LaTeX formulas | None | None |
| `simulation` | Running Backtest Lab or Wizard with "Synthetic" selected | None | Equity curve, return, vol, Sharpe, drawdown, win rate | `trades` is `floor(days * 0.6)` |
| `historical` | Running Backtest Lab with "Yahoo Finance" selected | Yahoo closing prices | Signal overlays and derived metrics | `trades` is actual signal changes |
| `config` | Settings page open | API key/endpoint records stored locally | None | Connection "status" checks are stubs |

## How to verify the system

```bash
npm install
npm test          # unit tests + deterministic fixtures
npm run lint      # oxlint
npm run build     # TypeScript + Vite production build
```

## How to add things

### Add a new strategy overlay (signal rule)

1. Add the `SignalType` variant in `src/lib/model.ts`.
2. Implement the signal generator in `src/lib/backtest.ts`.
3. Add a mapping in `selectSignalType`.
4. Add a UI label in `src/lib/config.ts` under `signalOptions`.
5. Add a fixture + test in `src/lib/fixtures.test.ts`.

### Add a new data provider

1. Create a typed adapter in `src/lib/data/<provider>.ts` implementing `MarketDataAdapter`.
2. Register it in `src/lib/engines.ts`.
3. Add connection logic to `src/lib/status.ts`.
4. Update `src/pages/Settings.tsx` to collect credentials.
5. Document limitations in `LIMITATIONS.md`.

### Add a new analytics metric

1. Compute it from an engine result in `src/lib/engines.ts` or `src/lib/simulation.ts`.
2. Tag it with `Provenance.synthetic`, `Provenance.real`, or `Provenance.cosmetic`.
3. If cosmetic, add it to `src/lib/config.ts` under `hardcodedRiskMetrics`.
4. Add a test in `src/lib/engines.test.ts`.

## Common traps

- **`"Data feeds live"` is not a real health check.** `Layout.tsx` always renders a green pulse. Use `getSystemStatus()` from `src/lib/status.ts` to know actual state.
- **The Wizard ranking is synthetic.** It perturbs base return/vol by strategy index and then runs the GBM engine. The "top 3" tells you which strategies got the highest Sharpe on fake paths, not which strategies are better.
- **`trades` in synthetic mode is cosmetic.** It is `Math.floor(days * 0.6)`, not a trade count.
- **Volatility in synthetic mode is biased.** It uses `mean(r²)` without subtracting the mean, so drift leaks into the vol estimate.
- **Sharpe subtracts a hardcoded 4% risk-free rate.** See `src/lib/config.ts`.
- **The correlation matrix is random noise.** `generateCorrelationMatrix` produces values that look plausible but are not estimated from data.
- **VaR / ES on the Analytics page are hardcoded literals.** They are not computed from any distribution.
- **API connection status checks are stubs.** Settings stores keys/endpoints but does not validate them against live endpoints.

## Deterministic fixtures

Use these frozen inputs whenever you want to confirm that a change did not break the numerical contract.

```ts
import { runBacktest } from './src/lib/simulation'

// Fixture A: 5-year synthetic baseline
const result = runBacktest(1_000_000, 5, 0.10, 0.16, 42)
// Expected: exactly reproducible equity[] and metrics for this seed.
```

See `src/lib/fixtures.ts` for the full set of golden inputs/outputs.

## Files an agent should know by heart

- `AGENTS.md` — this file.
- `src/lib/model.ts` — types, provenance, and operational modes.
- `src/lib/config.ts` — all hardcoded assumptions and presets.
- `src/lib/engines.ts` — the only place simulations are orchestrated.
- `src/lib/status.ts` — runtime system status.
- `LIMITATIONS.md` — truth table for what is real/simulated/cosmetic.
- `docs/system-map.html` — interactive data-flow diagram.

## Design rules

1. **No magic numbers in page components.** All constants live in `src/lib/config.ts`.
2. **No silent stubs.** If something is cosmetic or unimplemented, label it with `Provenance.cosmetic` and surface it in `SystemStatus`.
3. **No page invents its own simulation.** Pages call engines; engines call lower layers.
4. **Every engine result carries provenance and assumptions.** A rendered number must be traceable.
5. **Every change has a test or a fixture.** If you touch an engine, update its test.
