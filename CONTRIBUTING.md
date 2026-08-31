# Contributing to Vantage Seeker

Thank you for your interest in contributing. Vantage Seeker is a frontend research workbench for the strategies described in Kakushadze & Serur's *151 Trading Strategies*. The project values accuracy, transparency, and clean, minimal code.

## How to contribute

1. Fork the repository and create a feature branch.
2. Run `npm install` to install dependencies.
3. Make your changes.
4. Add or update tests in `src/**/*.test.ts`.
5. Run `npm run lint`, `npm test`, and `npm run build` locally.
6. Open a pull request with a clear description and motivation.

## Contract-first contribution guide

Vantage Seeker is organized as a layered system (see `AGENTS.md`). When you change a layer, update its contract:

- **Types:** if you change an interface in `src/lib/model.ts`, update all consumers.
- **Config:** if you add a hardcoded constant, move it to `src/lib/config.ts` and document it.
- **Engines:** if you change how simulations work, update `src/lib/engines.ts` and add a fixture in `src/lib/fixtures.ts`.
- **Provenance:** every computed or cosmetic number must carry a `Provenance` label. Do not introduce silent stubs.
- **Tests:** every engine change needs a unit test or a deterministic fixture check.
- **Docs:** update `LIMITATIONS.md` and `AGENTS.md` if the truth table changes.

## Accretion recipes

### Add a new strategy overlay (signal rule)

1. Add the `SignalType` variant in `src/lib/model.ts`.
2. Implement the signal generator in `src/lib/backtest.ts`.
3. Add a mapping in `selectSignalType`.
4. Add a UI label in `src/lib/config.ts` under `signalOptions`.
5. Add a fixture + test in `src/lib/fixtures.test.ts`.

### Add a new data provider

1. Create a typed adapter in `src/lib/data/<provider>.ts`.
2. Register it in `src/lib/engines.ts`.
3. Add connection logic to `src/lib/status.ts`.
4. Update `src/pages/Settings.tsx` to collect credentials.
5. Document limitations in `LIMITATIONS.md`.

### Add a new analytics metric

1. Compute it from an engine result in `src/lib/engines.ts` or `src/lib/simulation.ts`.
2. Tag it with `Provenance.synthetic`, `Provenance.real`, or `Provenance.cosmetic`.
3. If cosmetic, add it to `src/lib/config.ts` under `hardcodedRiskMetrics`.
4. Add a test in `src/lib/engines.test.ts`.

## Code style

- TypeScript strict mode is enabled.
- Use Tailwind CSS utility classes; avoid arbitrary dynamic class names.
- Keep components focused and reusable.
- Prefer explicit types over `any`.
- No magic numbers in page components; all constants belong in `src/lib/config.ts`.

## Reporting issues

When reporting bugs, please include:

- Steps to reproduce
- Expected vs actual behavior
- Browser and Node.js versions
- Screenshots if relevant

For feature requests, describe the use case and how it fits the project's scope as a research workbench.

## Code of conduct

Be respectful, constructive, and assume good intent. We are all here to learn and build better tools for quantitative strategy research.
