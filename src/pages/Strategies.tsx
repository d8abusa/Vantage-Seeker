import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { categories, strategies } from '@/data/strategies'
import { cn } from '@/lib/utils'
import { Filter, Grid3X3, List, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const complexities = ['Beginner', 'Intermediate', 'Advanced'] as const

const colorClasses: Record<string, { active: string; dot: string }> = {
  accent: { active: 'border-accent/50 bg-accent/10 text-accent', dot: 'bg-accent' },
  'accent-success': { active: 'border-accent-success/50 bg-accent-success/10 text-accent-success', dot: 'bg-accent-success' },
  'accent-warning': { active: 'border-accent-warning/50 bg-accent-warning/10 text-accent-warning', dot: 'bg-accent-warning' },
  'accent-danger': { active: 'border-accent-danger/50 bg-accent-danger/10 text-accent-danger', dot: 'bg-accent-danger' },
  'accent-secondary': { active: 'border-accent-secondary/50 bg-accent-secondary/10 text-accent-secondary', dot: 'bg-accent-secondary' },
  'accent-blue': { active: 'border-accent-blue/50 bg-accent-blue/10 text-accent-blue', dot: 'bg-accent-blue' },
}

export function Strategies() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedComplexity, setSelectedComplexity] = useState<string>('All')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    return strategies.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.description.toLowerCase().includes(query.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory
      const matchesComplexity = selectedComplexity === 'All' || s.complexity === selectedComplexity
      return matchesQuery && matchesCategory && matchesComplexity
    })
  }, [query, selectedCategory, selectedComplexity])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: strategies.length }
    strategies.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1
    })
    return counts
  }, [])

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Strategy Universe</h1>
          <p className="mt-1 text-text">
            Browse all {strategies.length} strategies from <em>151 Trading Strategies</em> (SSRN-3247865).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={view === 'grid' ? 'primary' : 'outline'} size="sm" onClick={() => setView('grid')}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={view === 'list' ? 'primary' : 'outline'} size="sm" onClick={() => setView('list')}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="sticky top-20 z-20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search strategies, tags, or formulas..."
              className="h-11 w-full rounded-lg border border-border bg-bg-card pl-10 pr-4 text-sm text-text-heading outline-none transition focus:border-accent"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-11 rounded-lg border border-border bg-bg-card px-3 text-sm text-text-heading outline-none transition focus:border-accent"
            >
              {Object.keys(categoryCounts).map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({categoryCounts[cat]})
                </option>
              ))}
            </select>
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="h-11 rounded-lg border border-border bg-bg-card px-3 text-sm text-text-heading outline-none transition focus:border-accent"
            >
              <option value="All">All Levels</option>
              {complexities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm" className="hidden lg:inline-flex">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(categories).map(([name, meta]) => {
            const active = selectedCategory === name
            return (
              <button
                key={name}
                onClick={() => setSelectedCategory(active ? 'All' : name)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition',
                  active ? colorClasses[meta.color]?.active || 'border-accent/50 bg-accent/10 text-accent' : 'border-border bg-bg-card text-text hover:border-border-strong hover:text-text-heading'
                )}
              >
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    colorClasses[meta.color]?.dot || 'bg-accent'
                  )}
                />
                {name}
              </button>
            )
          })}
        </div>
      </Card>

      <div className="text-sm text-text-muted">
        Showing <span className="font-semibold text-text-heading">{filtered.length}</span> strategies
      </div>

      <motion.div
        layout
        className={cn(
          'grid gap-4',
          view === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        )}
      >
        <AnimatePresence>
          {filtered.map((strategy, i) => (
            <motion.div
              key={strategy.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2, delay: Math.min(i * 0.01, 0.3) }}
            >
              <Link to={`/strategies/${strategy.slug}`}>
                <Card className="group h-full transition hover:border-accent/30 hover:bg-bg-hover">
                  <CardHeader>
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge
                          variant={
                            strategy.complexity === 'Beginner'
                              ? 'success'
                              : strategy.complexity === 'Advanced'
                              ? 'danger'
                              : 'accent'
                          }
                        >
                          {strategy.complexity}
                        </Badge>
                        {strategy.formulas.length > 0 && (
                          <Badge variant="secondary">{strategy.formulas.length} formulas</Badge>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-accent transition-colors">
                        {strategy.id}. {strategy.name}
                      </CardTitle>
                      <CardSubtitle className="mt-1">{strategy.category}</CardSubtitle>
                    </div>
                  </CardHeader>
                  <p className="line-clamp-2 text-sm text-text">{strategy.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {strategy.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-bg-hover px-2 py-1 text-xs text-text-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <Filter className="h-10 w-10 text-text-muted" />
          <h3 className="mt-4 text-lg font-semibold text-text-heading">No strategies found</h3>
          <p className="text-text-muted">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  )
}
