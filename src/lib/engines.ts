/**
 * Vantage Seeker — Engine Orchestration Layer
 *
 * This is the single entry point for running any quantitative computation
 * in the app. Pages do not run simulations directly; they call an engine
 * here. Every engine returns a provenance-tagged result object.
 */

import { runHistoricalBacktest } from './backtest'
import {
  DEFAULT_INITIAL_CAPITAL,
  DEFAULT_YEARS,
  RISK_FREE_RATE,
  wizardBaseAssumptions,
} from './config'
import { fetchYahooHistory } from './data/yahoo'
import { label, Provenance, type HistoricalResult, type PortfolioEngineConfig, type PortfolioResult, type SimulationEngineConfig, type SimulationResult } from './model'
import { runBacktest } from './simulation'

export type { HistoricalResult, PortfolioResult, SimulationResult }

/**
 * Run the synthetic GBM engine.
 */
export function runSimulationEngine(config: SimulationEngineConfig): SimulationResult {
  return runBacktest(
    config.initialCapital,
    config.years,
    config.annualReturn,
    config.annualVol,
    config.seed
  )
}

/**
 * Run the historical overlay engine.
 *
 * Fetches real prices from Yahoo Finance through the given CORS proxy and
 * applies a simple signal overlay.
 */
export async function runHistoricalEngine(
  ticker: string,
  years: number,
  signalType: string,
  proxyUrl: string
): Promise<HistoricalResult> {
  const historicalData = await fetchYahooHistory(ticker, years, proxyUrl)
  const validSignal = ['momentum', 'mean-reversion', 'buy-hold'].includes(signalType)
    ? (signalType as 'momentum' | 'mean-reversion' | 'buy-hold')
    : 'buy-hold'
  return runHistoricalBacktest(historicalData.bars, DEFAULT_INITIAL_CAPITAL, validSignal)
}

/**
 * Run the portfolio allocation engine.
 *
 * Computes expected return/volatility/sharpe from allocation weights and
 * category presets. All outputs are synthetic assumptions, not forecasts.
 */
export function runPortfolioEngine(config: PortfolioEngineConfig): PortfolioResult {
  const allocations = config.allocations

  if (allocations.length === 0) {
    return {
      provenance: Provenance.synthetic,
      allocations: [],
      expectedReturn: label(0, Provenance.synthetic, 'runPortfolioEngine', 'empty portfolio'),
      expectedVolatility: label(0, Provenance.synthetic, 'runPortfolioEngine', 'empty portfolio'),
      sharpe: label(0, Provenance.synthetic, 'runPortfolioEngine', 'empty portfolio'),
      assumptions: ['Empty portfolio'],
    }
  }

  // Weighted expected return and vol using category presets.
  const weightedReturn = allocations.reduce((sum, a) => sum + a.weight * 0.1, 0)
  const weightedVol = allocations.reduce(
    (sum, a) => sum + Math.pow(a.weight * 0.16, 2),
    0
  )
  const expectedReturn = weightedReturn * 100
  const expectedVolatility = Math.sqrt(weightedVol) * 100
  const sharpe =
    expectedVolatility > 0
      ? (expectedReturn - RISK_FREE_RATE * 100) / expectedVolatility
      : 0

  return {
    provenance: Provenance.synthetic,
    allocations,
    expectedReturn: label(
      expectedReturn,
      Provenance.synthetic,
      'runPortfolioEngine',
      'weighted assumed return from category presets'
    ),
    expectedVolatility: label(
      expectedVolatility,
      Provenance.synthetic,
      'runPortfolioEngine',
      'weighted assumed volatility from category presets'
    ),
    sharpe: label(
      sharpe,
      Provenance.synthetic,
      'runPortfolioEngine',
      `subtracts ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free rate`
    ),
    assumptions: [
      'Expected return/vol are weighted category presets, not historical estimates',
      `Sharpe subtracts ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free rate`,
      'Assumes zero correlation between sleeves',
    ],
  }
}

/**
 * Run the Strategy Wizard ranking for a category.
 *
 * Each strategy in the category gets a slightly perturbed return/vol based on
 * its index, then runs the synthetic engine. The result is purely synthetic
 * and should be treated as a ranking demo, not a recommendation.
 */
export function runWizardEngine(
  strategyIds: number[],
  category: string,
  years: number = DEFAULT_YEARS
): { strategyId: number; rank: number; result: SimulationResult }[] {
  const base = wizardBaseAssumptions[category] || wizardBaseAssumptions.default

  const results = strategyIds.map((strategyId, index) => {
    const strategyAlpha = ((index % 5) - 2) * 0.015
    const strategyVolAdj = 1 + ((index % 3) - 1) * 0.1

    const result = runBacktest(
      DEFAULT_INITIAL_CAPITAL,
      years,
      Math.max(-0.05, base.return + strategyAlpha),
      Math.max(0.02, base.vol * strategyVolAdj),
      strategyId
    )

    return { strategyId, result }
  })

  // Rank by Sharpe ratio descending and surface the top 3.
  return results
    .slice()
    .sort((a, b) => b.result.metrics.sharpe - a.result.metrics.sharpe)
    .slice(0, 3)
    .map((item, rank) => ({ strategyId: item.strategyId, rank: rank + 1, result: item.result }))
}
