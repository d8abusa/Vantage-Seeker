import { describe, expect, it } from 'vitest'
import { cn, formatCurrency, formatNumber, formatPercent } from './utils'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('should handle conditional classes', () => {
    expect(cn('a', false && 'b', 'c')).toBe('a c')
  })

  it('should merge tailwind conflicting classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})

describe('formatCurrency', () => {
  it('should format large numbers compactly', () => {
    expect(formatCurrency(1500000)).toBe('$1.5M')
    expect(formatCurrency(1000)).toBe('$1.0K')
  })

  it('should handle negative values', () => {
    expect(formatCurrency(-50000)).toBe('-$50.0K')
  })
})

describe('formatPercent', () => {
  it('should add plus sign for positive values', () => {
    expect(formatPercent(12.5)).toBe('+12.50%')
  })

  it('should keep minus sign for negative values', () => {
    expect(formatPercent(-5)).toBe('-5.00%')
  })
})

describe('formatNumber', () => {
  it('should format numbers compactly', () => {
    expect(formatNumber(2500)).toBe('2.5K')
    expect(formatNumber(1000000)).toBe('1M')
  })
})
