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

export function runBacktest(
  initialCapital: number,
  years: number,
  annualReturn: number,
  annualVol: number,
  seed = 42
): BacktestResult {
  const days = Math.floor(years * 252)
  const dailyReturn = annualReturn / 252
  const dailyVol = annualVol / Math.sqrt(252)

  let rng = seed
  const randn = () => {
    let u = 0
    let v = 0
    while (u === 0) u = ((rng = (rng * 9301 + 49297) % 233280) / 233280)
    while (v === 0) v = ((rng = (rng * 9301 + 49297) % 233280) / 233280)
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

  const totalReturn = (current - initialCapital) / initialCapital * 100
  const annualizedReturn = (Math.pow(current / initialCapital, 1 / years) - 1) * 100
  const variance = returns.reduce((a, b) => a + b * b, 0) / returns.length
  const volatility = Math.sqrt(variance) * Math.sqrt(252) * 100
  const sharpe = volatility > 0 ? (annualizedReturn - 4) / volatility : 0
  const maxDrawdown = Math.min(...drawdowns) * 100

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
      winRate: (positiveDays / days) * 100,
      trades: Math.floor(days * 0.6),
    },
  }
}

export function generateCorrelationMatrix(assets: string[]): number[][] {
  const n = assets.length
  const matrix: number[][] = Array.from({ length: n }, () => Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      matrix[i][j] = i === j ? 1 : Math.max(-0.9, Math.min(0.9, 0.3 + Math.random() * 0.4 - (i + j) * 0.03))
    }
  }
  return matrix
}
