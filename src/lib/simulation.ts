/**
 * Vantage Seeker — Synthetic Simulation Engine
 *
 * This module implements a deterministic, arithmetic GBM approximation.
 * It is NOT the textbook exponential GBM step. It is:
 *
 *   r_t = μ/252 + (σ/√252) * Z_t
 *   E_t = E_{t-1} * (1 + r_t)
 *
 * where Z_t is Box–Muller normal noise from a seeded linear congruential
 * generator. The same inputs and seed always produce the same path.
 *
 * Provenance: everything returned is Provenance.synthetic.
 */

import { DEFAULT_SEED, RISK_FREE_RATE, TRADING_DAYS_PER_YEAR } from './config'
import { Provenance, type SimulationResult } from './model'

export type { SimulationResult }

export interface BacktestResult {
  dates: string[]
  equity: number[]
  returns: number[]
  drawdowns: number[]
  metrics: {
    totalReturn: number
    annualizedReturn: number
    volatility: number
    sharpe: number
    maxDrawdown: number
    winRate: number
    trades: number
  }
}

/**
 * Run a deterministic synthetic backtest.
 *
 * @param initialCapital starting equity
 * @param years simulation horizon in years
 * @param annualReturn expected annual return (e.g. 0.10 for 10%)
 * @param annualVol expected annual volatility (e.g. 0.16 for 16%)
 * @param seed RNG seed for reproducibility
 */
export function runBacktest(
  initialCapital: number,
  years: number,
  annualReturn: number,
  annualVol: number,
  seed = DEFAULT_SEED
): SimulationResult {
  const days = Math.floor(years * TRADING_DAYS_PER_YEAR)
  const dailyReturn = annualReturn / TRADING_DAYS_PER_YEAR
  const dailyVol = annualVol / Math.sqrt(TRADING_DAYS_PER_YEAR)

  let rng = seed
  const randn = () => {
    let u = 0
    let v = 0
    while (u === 0) u = (rng = (rng * 9301 + 49297) % 233280) / 233280
    while (v === 0) v = (rng = (rng * 9301 + 49297) % 233280) / 233280
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  }

  const dates: string[] = []
  const equity: number[] = []
  const returns: number[] = []
  const drawdowns: number[] = []

  let current = initialCapital
  let peak = initialCapital
  let positiveDays = 0

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const ret = dailyReturn + dailyVol * randn()
    current *= 1 + ret
    peak = Math.max(peak, current)
    const dd = (current - peak) / peak

    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    dates.push(d.toISOString().split('T')[0])
    equity.push(current)
    returns.push(ret)
    drawdowns.push(dd)
    if (ret > 0) positiveDays++
  }

  const totalReturn = ((current - initialCapital) / initialCapital) * 100
  const annualizedReturn = (Math.pow(current / initialCapital, 1 / years) - 1) * 100
  // NOTE: this is a biased estimator — mean(r²) without subtracting the mean.
  const variance = returns.reduce((a, b) => a + b * b, 0) / returns.length
  const volatility = Math.sqrt(variance) * Math.sqrt(TRADING_DAYS_PER_YEAR) * 100
  const sharpe = volatility > 0 ? (annualizedReturn - RISK_FREE_RATE * 100) / volatility : 0
  const maxDrawdown = Math.min(...drawdowns) * 100

  return {
    dates,
    equity,
    returns,
    drawdowns,
    provenance: Provenance.synthetic,
    assumptions: [
      'Arithmetic GBM approximation (not exact exponential GBM)',
      `Annual return ${(annualReturn * 100).toFixed(2)}%, annual vol ${(annualVol * 100).toFixed(2)}%`,
      `${TRADING_DAYS_PER_YEAR} trading days/year`,
      `Seeded LCG (seed=${seed})`,
      `Volatility estimator uses mean(r²) with no mean subtraction`,
      `Sharpe subtracts ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free rate`,
      `trades is cosmetic: floor(days * 0.6)`,
    ],
    metrics: {
      totalReturn,
      annualizedReturn,
      volatility,
      sharpe,
      maxDrawdown,
      winRate: (positiveDays / days) * 100,
      trades: Math.floor(days * 0.6),
    },
    seed,
    annualReturn,
    annualVol,
    years,
  }
}

/**
 * Generate a plausible-looking but entirely random correlation matrix.
 *
 * WARNING: This is cosmetic. The values are not estimated from data and the
 * resulting matrix is not guaranteed to be symmetric or positive-definite.
 */
export function generateCorrelationMatrix(assets: string[]): number[][] {
  const n = assets.length
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] =
        i === j
          ? 1
          : Math.max(-0.9, Math.min(0.9, 0.3 + Math.random() * 0.4 - (i + j) * 0.03))
    }
  }
  return matrix
}
