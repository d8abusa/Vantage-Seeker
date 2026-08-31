import { describe, expect, it } from 'vitest'
import { runPortfolioEngine, runSimulationEngine, runWizardEngine } from './engines'
import { Provenance } from './model'

describe('runSimulationEngine', () => {
  it('returns a synthetic result with provenance', () => {
    const result = runSimulationEngine({
      initialCapital: 1_000_000,
      years: 2,
      annualReturn: 0.08,
      annualVol: 0.12,
      seed: 7,
    })
    expect(result.provenance).toBe(Provenance.synthetic)
    expect(result.assumptions.length).toBeGreaterThan(0)
    expect(result.metrics.sharpe).not.toBeNaN()
  })
})

describe('runPortfolioEngine', () => {
  it('returns synthetic labels for portfolio metrics', () => {
    const result = runPortfolioEngine({
      allocations: [
        { strategyId: 1, name: 'Strategy A', category: 'Stocks', weight: 0.5 },
        { strategyId: 2, name: 'Strategy B', category: 'Fixed Income', weight: 0.5 },
      ],
    })
    expect(result.provenance).toBe(Provenance.synthetic)
    expect(result.expectedReturn.provenance).toBe(Provenance.synthetic)
    expect(result.expectedVolatility.provenance).toBe(Provenance.synthetic)
    expect(result.sharpe.provenance).toBe(Provenance.synthetic)
    expect(result.assumptions.length).toBeGreaterThan(0)
  })

  it('handles empty portfolio', () => {
    const result = runPortfolioEngine({ allocations: [] })
    expect(result.expectedReturn.value).toBe(0)
    expect(result.sharpe.value).toBe(0)
  })
})

describe('runWizardEngine', () => {
  it('ranks strategies by Sharpe and returns top 3', () => {
    const ranked = runWizardEngine([10, 20, 30, 40, 50], 'Stocks', 3)
    expect(ranked).toHaveLength(3)
    expect(ranked[0].rank).toBe(1)
    expect(ranked[0].result.provenance).toBe(Provenance.synthetic)
    expect(ranked[0].result.metrics.sharpe).toBeGreaterThanOrEqual(ranked[1].result.metrics.sharpe)
  })
})
