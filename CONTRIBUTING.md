# Contributing to Vantage Seeker

Thank you for your interest in contributing. Vantage Seeker is a frontend research workbench for the strategies described in Kakushadze & Serur's *151 Trading Strategies*. The project values accuracy, transparency, and clean, minimal code.

## How to contribute

1. Fork the repository and create a feature branch.
2. Run `npm install` to install dependencies.
3. Make your changes.
4. Add or update tests in `src/**/*.test.ts`.
5. Run `npm run lint`, `npm test`, and `npm run build` locally.
6. Open a pull request with a clear description and motivation.

## What we need help with

- Correcting strategy descriptions or formulas against the original SSRN-3247865 paper
- Adding real market-data adapters (Yahoo Finance, Polygon, Alpaca, etc.)
- Improving transaction-cost and slippage modeling
- Adding more unit tests, especially for strategy filtering and data adapters
- Documentation and tutorials

## Code style

- TypeScript strict mode is enabled.
- Use Tailwind CSS utility classes; avoid arbitrary dynamic class names.
- Keep components focused and reusable.
- Prefer explicit types over `any`.

## Reporting issues

When reporting bugs, please include:

- Steps to reproduce
- Expected vs actual behavior
- Browser and Node.js versions
- Screenshots if relevant

For feature requests, describe the use case and how it fits the project's scope as a research workbench.

## Code of conduct

Be respectful, constructive, and assume good intent. We are all here to learn and build better tools for quantitative strategy research.
