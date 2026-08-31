import { describe, expect, it } from 'vitest'
import { generateCorrelationMatrix, runBacktest } from './simulation'

describe('runBacktest', () => {
  it('should preserve initial capital with zero return and zero vol', () => {
    const result = runBacktest(1000000, 1, 0, 0, 123)
    expect(result.equity[result.equity.length - 1]).toBeCloseTo(1000000, 0)
    expect(result.metrics.totalReturn).toBeCloseTo(0, 4)
  })

  it('should produce deterministic results for the same seed', () => {
    const a = runBacktest(1000000, 5, 0.1, 0.15, 42)
    const b = runBacktest(1000000, 5, 0.1, 0.15, 42)
    expect(a.equity[a.equity.length - 1]).toBeCloseTo(b.equity[b.equity.length - 1], 4)
  })

  it('should produce different results for different seeds', () => {
    const a = runBacktest(1000000, 5, 0.1, 0.15, 1)
    const b = runBacktest(1000000, 5, 0.1, 0.15, 2)
    expect(a.equity[a.equity.length - 1]).not.toBeCloseTo(b.equity[b.equity.length - 1], 0)
  })

  it('should reflect positive drift with high expected return', () => {
    const result = runBacktest(1000000, 5, 0.5, 0.05, 7)
    expect(result.equity[result.equity.length - 1]).toBeGreaterThan(1000000)
  })
})

describe('generateCorrelationMatrix', () => {
  it('should produce a square matrix with ones on the diagonal', () => {
    const assets = ['A', 'B', 'C']
    const matrix = generateCorrelationMatrix(assets)
    expect(matrix).toHaveLength(3)
    matrix.forEach((row, i) => {
      expect(row).toHaveLength(3)
      expect(row[i]).toBe(1)
    })
  })

  it('should produce correlations between -1 and 1', () => {
    const assets = ['A', 'B', 'C', 'D']
    const matrix = generateCorrelationMatrix(assets)
    matrix.forEach((row) => {
      row.forEach((val) => {
        expect(val).toBeGreaterThanOrEqual(-1)
        expect(val).toBeLessThanOrEqual(1)
      })
    })
  })
})
