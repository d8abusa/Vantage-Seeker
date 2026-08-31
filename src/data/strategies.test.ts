import { describe, expect, it } from 'vitest'
import { categories, strategies } from './strategies'

describe('strategies data', () => {
  it('should have unique strategy IDs', () => {
    const ids = strategies.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have unique slugs', () => {
    const slugs = strategies.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('should only reference known categories', () => {
    const categoryNames = Object.keys(categories)
    strategies.forEach((s) => {
      expect(categoryNames).toContain(s.category)
    })
  })

  it('should have complexity values in allowed set', () => {
    strategies.forEach((s) => {
      expect(['Beginner', 'Intermediate', 'Advanced']).toContain(s.complexity)
    })
  })

  it('should have non-empty names and descriptions', () => {
    strategies.forEach((s) => {
      expect(s.name).toBeTruthy()
      expect(s.description).toBeTruthy()
    })
  })
})
