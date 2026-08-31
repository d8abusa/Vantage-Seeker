import type { YahooBar } from './data/yahoo'

export interface HistoricalBacktestResult {
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
  signalDescription: string
}

export type SignalType = 'momentum' | 'mean-reversion' | 'buy-hold'

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

export function runHistoricalBacktest(
  bars: YahooBar[],
  initialCapital: number,
  signalType: SignalType
): HistoricalBacktestResult {
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
  const totalReturn = (finalEquity - initialCapital) / initialCapital * 100
  const years = bars.length / 252
  const annualizedReturn = years > 0 ? (Math.pow(finalEquity / initialCapital, 1 / years) - 1) * 100 : 0
  const variance = returns.slice(1).reduce((a, b) => a + b * b, 0) / Math.max(1, returns.length - 1)
  const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100
  const sharpe = volatility > 0 ? (annualizedReturn - 4) / volatility : 0
  const maxDrawdown = Math.min(...drawdowns) * 100

  const descriptions: Record<SignalType, string> = {
    'momentum': 'Long when 20-day SMA > 50-day SMA, short when below.',
    'mean-reversion': 'Long when price z-score < -1.5, short when z-score > +1.5.',
    'buy-hold': 'Fully invested long throughout the period.',
  }

  return {
    dates,
    equity,
    returns,
    drawdowns,
    metrics: {
      totalReturn,
      annualizedReturn,
      volatility,
      sharpe,
      maxDrawdown,
      winRate: bars.length > 1 ? (positiveDays / (bars.length - 1)) * 100 : 0,
      trades,
    },
    signalDescription: descriptions[signalType],
  }
}

export function selectSignalType(category: string): SignalType {
  if (['Stocks', 'ETFs', 'Futures', 'Cryptocurrencies'].includes(category)) return 'momentum'
  if (['Volatility', 'Foreign Exchange', 'Commodities'].includes(category)) return 'mean-reversion'
  return 'buy-hold'
}
