import { describe, expect, it } from 'vitest'
import { label, OperationalMode, Provenance } from './model'

describe('Provenance', () => {
  it('contains expected labels', () => {
    expect(Provenance.real).toBe('real')
    expect(Provenance.synthetic).toBe('synthetic')
    expect(Provenance.cosmetic).toBe('cosmetic')
    expect(Provenance.config).toBe('config')
    expect(Provenance.presentation).toBe('presentation')
  })
})

describe('label', () => {
  it('wraps a value with provenance and source', () => {
    const lv = label(42, Provenance.cosmetic, 'test', 'hardcoded answer')
    expect(lv.value).toBe(42)
    expect(lv.provenance).toBe(Provenance.cosmetic)
    expect(lv.source).toBe('test')
    expect(lv.note).toBe('hardcoded answer')
  })
})

describe('OperationalMode', () => {
  it('contains expected modes', () => {
    expect(OperationalMode.research).toBe('research')
    expect(OperationalMode.simulation).toBe('simulation')
    expect(OperationalMode.historical).toBe('historical')
    expect(OperationalMode.config).toBe('config')
  })
})
