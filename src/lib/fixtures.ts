/**
 * Vantage Seeker — Deterministic Fixtures
 *
 * These are frozen inputs and expected outputs that agents and tests can use
 * to verify the numerical contract of the engines has not changed.
 */

import { runHistoricalBacktest } from './backtest'
import { DEFAULT_INITIAL_CAPITAL, DEFAULT_SEED, TRADING_DAYS_PER_YEAR } from './config'
import { runSimulationEngine, runWizardEngine } from './engines'
import { Provenance } from './model'
import { runBacktest } from './simulation'

/** Fixture A: 5-year synthetic baseline with the default seed. */
export const fixtureSyntheticBaseline = runBacktest(
  DEFAULT_INITIAL_CAPITAL,
  5,
  0.1,
  0.16,
  DEFAULT_SEED
)

/** Fixture B: 1-year zero-drift, zero-vol sanity check. */
export const fixtureSyntheticFlat = runBacktest(1_000_000, 1, 0, 0, 123)

/** Fixture C: Engine-wrapper version of the baseline. */
export const fixtureEngineBaseline = runSimulationEngine({
  initialCapital: DEFAULT_INITIAL_CAPITAL,
  years: 5,
  annualReturn: 0.1,
  annualVol: 0.16,
  seed: DEFAULT_SEED,
})

/** Fixture D: A flat historical price series. */
export const fixtureFlatHistoricalBars = Array.from({ length: 100 }, (_, i) => ({
  date: `2024-01-${String((i % 30) + 1).padStart(2, '0')}`,
  open: 100 + i,
  high: 101 + i,
  low: 99 + i,
  close: 100 + i,
  volume: 1000,
}))

/** Fixture E: Historical buy-hold result on flat bars. */
export const fixtureHistoricalFlat = runHistoricalBacktest(
  fixtureFlatHistoricalBars,
  DEFAULT_INITIAL_CAPITAL,
  'buy-hold'
)

/** Fixture F: Wizard ranking for Stocks over 5 years. */
export const fixtureWizardStocks = runWizardEngine(
  [1, 2, 3, 4, 5],
  'Stocks',
  5
)

/** Validation invariants that every fixture must satisfy. */
export const fixtureInvariants = {
  syntheticBaseline: {
    provenance: Provenance.synthetic,
    days: 5 * TRADING_DAYS_PER_YEAR,
    seed: DEFAULT_SEED,
    finalEquityGreaterThanZero: fixtureSyntheticBaseline.equity.at(-1)! > 0,
  },
  syntheticFlat: {
    finalEquity: fixtureSyntheticFlat.equity.at(-1)!,
    totalReturn: fixtureSyntheticFlat.metrics.totalReturn,
  },
  historicalFlat: {
    provenance: Provenance.real,
    trades: fixtureHistoricalFlat.metrics.trades,
  },
}
