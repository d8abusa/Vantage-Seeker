# Limitations

Vantage Seeker is a **frontend research workbench and strategy catalog**. It is useful for exploring, comparing, and reasoning about quantitative trading strategies, but it is not a production trading system. Please understand the following limitations before drawing any conclusions from the numbers it produces.

## What this project is

- An interactive catalog of the strategies described in Kakushadze & Serur, *151 Trading Strategies* (SSRN-3247865).
- A place to inspect mathematical formulations, run quick simulations, and build toy portfolios.
- A learning and prototyping tool for quantitative strategy research.

## What this project is not

- A live trading platform.
- A source of guaranteed or historically validated returns.
- A replacement for institutional risk management, compliance, or execution infrastructure.
- A system that has been audited, battle-tested, or run with real capital.

## Data limitations

### No live market data by default

By default, Vantage Seeker does not connect to any market data provider. Prices, returns, and equity curves are generated synthetically unless you explicitly connect an API key in **Settings → API Connections** and the adapter for that provider has been implemented.

### Backtests are simulations, not history

Unless a data-provider adapter is active, the **Backtest Lab** and **Strategy Wizard** use Monte Carlo simulation based on:

- An assumed annual return.
- An assumed annual volatility.
- A random seed derived from the strategy ID for reproducibility.

These simulations are useful for sensitivity analysis and quick comparisons, but they are **not** historical backtests. They do not reflect actual market regimes, correlations, liquidity events, or tail risks.

### Missing market realities

The current simulations do not model:

- Transaction costs, commissions, or fees.
- Slippage or market impact.
- Borrow costs for short positions.
- Dividends, stock splits, or corporate actions.
- Market liquidity or capacity constraints.
- Overfitting or data-snooping bias.
- Execution delays, exchange outages, or bad ticks.

## Strategy limitations

- Strategy descriptions and formulas are **pedagogical summaries** from the original paper, not plug-and-play production code.
- Many strategies require data or instruments that are not freely available (e.g., CDS spreads, convertible bond terms, distressed debt quotes).
- Some strategies are academic illustrations rather than practical implementations.
- The ranking in the **Strategy Wizard** is based on synthetic Sharpe ratios and should be treated as a starting point for research, not a recommendation.

## Risk and compliance

- The risk metrics in the **Risk Analytics** page are computed from simulated or hypothetical data.
- No compliance, regulatory, or suitability checks are performed.
- No real-money P&L, fills, or positions are tracked.

## Using this software

Do not use Vantage Seeker to make investment decisions without independently validating every strategy, data source, and assumption. If you connect a live brokerage or data-provider API, do so at your own risk and ensure you understand the provider's terms of service, rate limits, and security requirements.

For a production-grade workflow, you would need at minimum:

1. Curated historical data from a reputable vendor.
2. Out-of-sample backtesting with transaction-cost modeling.
3. Robust execution infrastructure with paper-trading validation.
4. Risk controls, position limits, and drawdown circuits.
5. Independent code review and compliance sign-off.

Vantage Seeker is intentionally scoped below that line. It is a starting point, not a finish line.
