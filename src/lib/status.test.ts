import { describe, expect, it } from 'vitest'
import { OperationalMode, Provenance } from './model'
import { describeMode, getSystemStatus } from './status'

describe('getSystemStatus', () => {
  it('reports research mode by default', () => {
    const status = getSystemStatus()
    expect(status.mode).toBe(OperationalMode.research)
    expect(status.strategiesLoaded).toBeGreaterThan(0)
    expect(status.cosmeticMetrics.length).toBeGreaterThan(0)
    expect(status.stubbedFeatures.length).toBeGreaterThan(0)
  })

  it('reports simulation mode when overridden', () => {
    const status = getSystemStatus(OperationalMode.simulation)
    expect(status.mode).toBe(OperationalMode.simulation)
  })

  it('lists sources with correct provenance', () => {
    const status = getSystemStatus()
    const paper = status.sources.find((s) => s.name.includes('SSRN'))
    expect(paper?.provenance).toBe(Provenance.real)
    expect(paper?.connected).toBe(true)

    const apis = status.sources.find((s) => s.name.includes('Brokerage'))
    expect(apis?.provenance).toBe(Provenance.config)
    expect(apis?.connected).toBe(false)
  })
})

describe('describeMode', () => {
  it('describes each mode', () => {
    expect(describeMode(OperationalMode.research)).toContain('Research')
    expect(describeMode(OperationalMode.simulation)).toContain('Simulation')
    expect(describeMode(OperationalMode.historical)).toContain('Historical')
    expect(describeMode(OperationalMode.config)).toContain('Config')
  })
})
