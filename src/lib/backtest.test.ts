import { describe, expect, it } from 'vitest'
import { runHistoricalBacktest, selectSignalType } from './backtest'

describe('runHistoricalBacktest', () => {
  const bars = Array.from({ length: 100 }, (_, i) => ({
    date: `2024-01-${String((i % 30) + 1).padStart(2, '0')}`,
    open: 100 + i,
    high: 101 + i,
    low: 99 + i,
    close: 100 + i,
    volume: 1000,
  }))

  it('should preserve initial capital for buy-hold on a flat-ish path', () => {
    const result = runHistoricalBacktest(bars, 1000000, 'buy-hold')
    expect(result.equity[result.equity.length - 1]).toBeGreaterThan(0)
    expect(result.metrics.trades).toBe(0)
  })

  it('should produce higher equity for an upward trend with momentum', () => {
    const result = runHistoricalBacktest(bars, 1000000, 'momentum')
    expect(result.equity[result.equity.length - 1]).toBeGreaterThan(1000000)
  })

  it('should include signal description', () => {
    const result = runHistoricalBacktest(bars, 1000000, 'mean-reversion')
    expect(result.signalDescription).toContain('z-score')
  })
})

describe('selectSignalType', () => {
  it('should return momentum for Stocks', () => {
    expect(selectSignalType('Stocks')).toBe('momentum')
  })

  it('should return mean-reversion for Volatility', () => {
    expect(selectSignalType('Volatility')).toBe('mean-reversion')
  })

  it('should return buy-hold for Fixed Income', () => {
    expect(selectSignalType('Fixed Income')).toBe('buy-hold')
  })
})
