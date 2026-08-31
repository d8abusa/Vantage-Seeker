/**
 * Vantage Seeker — Historical Backtest Engine
 *
 * This module runs simple price-overlay signals on real historical closes
 * fetched from Yahoo Finance. It is intentionally naive: no dividends, fees,
 * slippage, or borrow costs.
 *
 * Provenance: prices are Provenance.real; signals and derived metrics are
 * Provenance.synthetic overlays on top of real data.
 */

import { RISK_FREE_RATE, TRADING_DAYS_PER_YEAR } from './config'
import type { YahooBar } from './data/yahoo'
import { Provenance, type HistoricalResult, type SignalType } from './model'

export type { HistoricalResult, SignalType }

function sma(values: number[], period: number): number[] {
  const result: number[] = []
  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) {
      result.push(NaN)
      continue
    }
    const slice = values.slice(i - period + 1, i + 1)
    result.push(slice.reduce((a, b) => a + b, 0) / period)
  }
  return result
}

function std(values: number[], period: number): number[] {
  const result: number[] = []
  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) {
      result.push(NaN)
      continue
    }
    const slice = values.slice(i - period + 1, i + 1)
    const mean = slice.reduce((a, b) => a + b, 0) / period
    const variance = slice.reduce((a, b) => a + (b - mean) ** 2, 0) / (period - 1)
    result.push(Math.sqrt(variance))
  }
  return result
}

function generateSignals(closes: number[], signalType: SignalType): number[] {
  const n = closes.length
  const signals: number[] = new Array(n).fill(0)

  if (signalType === 'buy-hold') {
    return signals.fill(1)
  }

  if (signalType === 'momentum') {
    const fast = sma(closes, 20)
    const slow = sma(closes, 50)
    for (let i = 1; i < n; i++) {
      if (!isNaN(fast[i]) && !isNaN(slow[i])) {
        signals[i] = fast[i] > slow[i] ? 1 : -1
      }
    }
    return signals
  }

  if (signalType === 'mean-reversion') {
    const ma = sma(closes, 20)
    const s = std(closes, 20)
    for (let i = 1; i < n; i++) {
      if (!isNaN(ma[i]) && !isNaN(s[i]) && s[i] > 0) {
        const z = (closes[i] - ma[i]) / s[i]
        if (z < -1.5) signals[i] = 1
        else if (z > 1.5) signals[i] = -1
        else signals[i] = signals[i - 1]
      }
    }
    return signals
  }

  return signals
}

const descriptions: Record<SignalType, string> = {
  momentum: 'Long when 20-day SMA > 50-day SMA, short when below.',
  'mean-reversion': 'Long when price z-score < -1.5, short when z-score > +1.5.',
  'buy-hold': 'Fully invested long throughout the period.',
}

/**
 * Run a historical backtest using real closing prices and a simple signal overlay.
 *
 * @param bars Yahoo Finance bars (date + close)
 * @param initialCapital starting equity
 * @param signalType overlay rule to apply
 */
export function runHistoricalBacktest(
  bars: YahooBar[],
  initialCapital: number,
  signalType: SignalType
): HistoricalResult {
  const closes = bars.map((b) => b.close)
  const dates = bars.map((b) => b.date)
  const signals = generateSignals(closes, signalType)

  const equity: number[] = [initialCapital]
  const returns: number[] = [0]
  const drawdowns: number[] = [0]
  let peak = initialCapital
  let positiveDays = 0
  let trades = 0
  let prevSignal = signals[0]

  for (let i = 1; i < bars.length; i++) {
    const dailyReturn = (closes[i] - closes[i - 1]) / closes[i - 1]
    const signal = signals[i - 1]
    const strategyReturn = signal * dailyReturn

    const current = equity[i - 1] * (1 + strategyReturn)
    equity.push(current)
    returns.push(strategyReturn)

    if (strategyReturn > 0) positiveDays++
    if (signal !== prevSignal && signal !== 0) trades++
    prevSignal = signal

    peak = Math.max(peak, current)
    drawdowns.push((current - peak) / peak)
  }

  const finalEquity = equity[equity.length - 1]
  const totalReturn = ((finalEquity - initialCapital) / initialCapital) * 100
  const years = bars.length / TRADING_DAYS_PER_YEAR
  const annualizedReturn = years > 0 ? (Math.pow(finalEquity / initialCapital, 1 / years) - 1) * 100 : 0
  const variance = returns.slice(1).reduce((a, b) => a + b * b, 0) / Math.max(1, returns.length - 1)
  const volatility = Math.sqrt(variance) * Math.sqrt(TRADING_DAYS_PER_YEAR) * 100
  const sharpe = volatility > 0 ? (annualizedReturn - RISK_FREE_RATE * 100) / volatility : 0
  const maxDrawdown = Math.min(...drawdowns) * 100

  return {
    dates,
    equity,
    returns,
    drawdowns,
    provenance: Provenance.real,
    assumptions: [
      'Prices fetched from Yahoo Finance (real historical closes)',
      `Signal overlay: ${descriptions[signalType]}`,
      'No dividends, fees, slippage, or borrow costs',
      `Sharpe subtracts ${(RISK_FREE_RATE * 100).toFixed(0)}% risk-free rate`,
    ],
    metrics: {
      totalReturn,
      annualizedReturn,
      volatility,
      sharpe,
      maxDrawdown,
      winRate: bars.length > 1 ? (positiveDays / (bars.length - 1)) * 100 : 0,
      trades,
    },
    signalType,
    signalDescription: descriptions[signalType],
  }
}

/**
 * Choose a default signal overlay for a strategy category.
 */
export function selectSignalType(category: string): SignalType {
  if (['Stocks', 'ETFs', 'Futures', 'Cryptocurrencies'].includes(category)) return 'momentum'
  if (['Volatility', 'Foreign Exchange', 'Commodities'].includes(category)) return 'mean-reversion'
  return 'buy-hold'
}
