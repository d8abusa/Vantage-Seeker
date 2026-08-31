import { describe, expect, it } from 'vitest'
import {
  fixtureEngineBaseline,
  fixtureInvariants,
  fixtureSyntheticBaseline,
  fixtureWizardStocks,
} from './fixtures'

describe('fixtures', () => {
  it('synthetic baseline is reproducible', () => {
    expect(fixtureSyntheticBaseline.seed).toBe(fixtureEngineBaseline.seed)
    expect(fixtureSyntheticBaseline.equity.at(-1)).toBeCloseTo(fixtureEngineBaseline.equity.at(-1)!, 4)
  })

  it('synthetic baseline has expected provenance and length', () => {
    expect(fixtureInvariants.syntheticBaseline.provenance).toBe('synthetic')
    expect(fixtureSyntheticBaseline.dates.length).toBe(fixtureInvariants.syntheticBaseline.days)
  })

  it('flat synthetic run preserves capital', () => {
    expect(fixtureInvariants.syntheticFlat.finalEquity).toBeCloseTo(1_000_000, 0)
    expect(fixtureInvariants.syntheticFlat.totalReturn).toBeCloseTo(0, 4)
  })

  it('historical flat buy-hold has real provenance and zero trades', () => {
    expect(fixtureInvariants.historicalFlat.provenance).toBe('real')
    expect(fixtureInvariants.historicalFlat.trades).toBe(0)
  })

  it('wizard ranking returns top 3', () => {
    expect(fixtureWizardStocks.length).toBe(3)
    expect(fixtureWizardStocks[0].rank).toBe(1)
    expect(fixtureWizardStocks[0].result.provenance).toBe('synthetic')
  })
})
