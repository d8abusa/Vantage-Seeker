import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { categories, strategies } from '@/data/strategies'
import { runWizardEngine } from '@/lib/engines'
import { OperationalMode, Provenance, type SimulationResult } from '@/lib/model'
import { cn, formatCurrency, formatPercent } from '@/lib/utils'
import { ArrowRight, BarChart3, Sparkles, Target, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'framer-motion'

const timeframes = [
  { label: '1Y', years: 1 },
  { label: '3Y', years: 3 },
  { label: '5Y', years: 5 },
  { label: '10Y', years: 10 },
]

const categoryCardStyles: Record<string, { border: string; bg: string; text: string }> = {
  accent: { border: 'border-accent', bg: 'bg-accent/10', text: 'text-accent' },
  'accent-success': { border: 'border-accent-success', bg: 'bg-accent-success/10', text: 'text-accent-success' },
  'accent-warning': { border: 'border-accent-warning', bg: 'bg-accent-warning/10', text: 'text-accent-warning' },
  'accent-danger': { border: 'border-accent-danger', bg: 'bg-accent-danger/10', text: 'text-accent-danger' },
  'accent-secondary': { border: 'border-accent-secondary', bg: 'bg-accent-secondary/10', text: 'text-accent-secondary' },
  'accent-blue': { border: 'border-accent-blue', bg: 'bg-accent-blue/10', text: 'text-accent-blue' },
}

interface WizardResult {
  strategyId: number
  strategyName: string
  category: string
  result: SimulationResult
  rank: number
}

export function Wizard() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Stocks')
  const [asset, setAsset] = useState('SPY')
  const [years, setYears] = useState(5)
  const [running, setRunning] = useState(false)
  const [results, setResults] = useState<WizardResult[] | null>(null)

  const categoryStrategies = useMemo(
    () => strategies.filter((s) => s.category === selectedCategory),
    [selectedCategory]
  )

  const runWizard = () => {
    setRunning(true)
    setResults(null)

    // Simulate async processing
    setTimeout(() => {
      const ranked = runWizardEngine(
        categoryStrategies.map((s) => s.id),
        selectedCategory,
        years
      )

      const simulated: WizardResult[] = ranked.slice(0, 3).map((item) => {
        const strategy = strategies.find((s) => s.id === item.strategyId)!
        return {
          strategyId: strategy.id,
          strategyName: strategy.name,
          category: strategy.category,
          result: item.result,
          rank: item.rank,
        }
      })

      setResults(simulated)
      setRunning(false)
    }, 600)
  }

  const rankColors = [
    { border: 'border-accent', bg: 'bg-accent/10', text: 'text-accent', glow: 'glow-accent' },
    { border: 'border-accent-secondary', bg: 'bg-accent-secondary/10', text: 'text-accent-secondary', glow: '' },
    { border: 'border-accent-success', bg: 'bg-accent-success/10', text: 'text-accent-success', glow: '' },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-secondary shadow-lg shadow-accent/20">
          <Sparkles className="h-7 w-7 text-bg" />
        </div>
        <h1 className="text-3xl font-bold text-text-heading lg:text-4xl">
          Strategy <span className="text-gradient">Wizard</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-text">
          Pick an asset class and ticker. The wizard runs every relevant strategy from SSRN-3247865,
          ranks them by risk-adjusted return, and surfaces the top 3 for your portfolio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div>
              <CardTitle>1. Select Asset Class</CardTitle>
              <CardSubtitle>{categoryStrategies.length} strategies available in this class</CardSubtitle>
            </div>
          </CardHeader>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(categories).map(([name, meta]) => {
              const active = selectedCategory === name
              const count = strategies.filter((s) => s.category === name).length
              return (
                <button
                  key={name}
                  onClick={() => { setSelectedCategory(name); setResults(null) }}
                  className={cn(
                    'relative rounded-xl border p-4 text-left transition',
                    active
                      ? `${categoryCardStyles[meta.color]?.border || 'border-accent'} ${categoryCardStyles[meta.color]?.bg || 'bg-accent/10'}`
                      : 'border-border bg-bg-card hover:border-border-strong hover:bg-bg-hover'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('font-semibold', active ? 'text-text-heading' : 'text-text')}>{name}</span>
                    <Badge variant="default">{count}</Badge>
                  </div>
                  {active && (
                    <div className={cn('mt-2 text-xs font-medium', categoryCardStyles[meta.color]?.text || 'text-accent')}>
                      Selected
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card>
          <CardHeader>
            <div>
              <CardTitle>2. Configure Benchmark</CardTitle>
              <CardSubtitle>Ticker and backtest horizon</CardSubtitle>
            </div>
          </CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Asset / Ticker
              </label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value.toUpperCase())}
                placeholder="e.g. SPY, BTC-USD, EURUSD"
                className="h-11 w-full rounded-lg border border-border bg-bg-card px-3 font-mono text-sm text-text-heading outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-text-muted">
                Horizon
              </label>
              <div className="flex gap-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf.label}
                    onClick={() => { setYears(tf.years); setResults(null) }}
                    className={cn(
                      'h-11 rounded-lg border px-4 text-sm font-medium transition',
                      years === tf.years
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border bg-bg-card text-text hover:border-border-strong'
                    )}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={runWizard} disabled={running || categoryStrategies.length === 0} className="h-11">
              <Zap className="h-4 w-4" />
              {running ? 'Running...' : 'Run Wizard'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {running && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-bg-card py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="mt-4 text-text-muted">Running {categoryStrategies.length} strategies...</p>
        </div>
      )}

      {results && !running && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-text-heading">Top 3 Strategies</h2>
              <p className="text-text-muted">
                For {asset} over {years} years in {selectedCategory}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="warning">{OperationalMode.simulation}</Badge>
                <Badge variant="outline">{Provenance.synthetic}</Badge>
                <span className="text-xs text-text-muted">
                  Ranking is produced from perturbed synthetic assumptions, not historical performance.
                </span>
              </div>
            </div>
            <Link to="/portfolio">
              <Button variant="outline">
                <Target className="h-4 w-4" />
                Build Portfolio
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {results.map((item, i) => {
              const colors = rankColors[i]
              const chartData = item.result.dates
                .map((date, idx) => ({ date, equity: item.result.equity[idx] }))
                .filter((_, idx) => idx % Math.max(1, Math.floor(item.result.dates.length / 50)) === 0)

              return (
                <motion.div
                  key={item.strategyId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={cn('relative h-full overflow-hidden', colors.border, i === 0 && colors.glow)}>
                    <div className={cn('absolute left-0 top-0 h-full w-1', colors.bg.replace('/10', ''))} />
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg font-bold', colors.bg, colors.text)}>
                          #{item.rank}
                        </div>
                        <div>
                          <CardTitle className="text-base">{item.strategyName}</CardTitle>
                          <CardSubtitle>Sharpe {item.result.metrics.sharpe.toFixed(2)}</CardSubtitle>
                        </div>
                      </div>
                    </CardHeader>

                    <div className="mb-4 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id={`wizardGradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={i === 0 ? '#22d3ee' : i === 1 ? '#8b5cf6' : '#34d399'} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={i === 0 ? '#22d3ee' : i === 1 ? '#8b5cf6' : '#34d399'} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="date" tickFormatter={(v) => v.slice(0, 7)} minTickGap={40} />
                          <YAxis tickFormatter={(v) => `$${(v / 1e6).toFixed(1)}M`} />
                          <Tooltip
                            contentStyle={{ background: '#15171d', border: '1px solid #23262e', borderRadius: '8px' }}
                            formatter={(value) => formatCurrency(Number(value))}
                          />
                          <Area
                            type="monotone"
                            dataKey="equity"
                            stroke={i === 0 ? '#22d3ee' : i === 1 ? '#8b5cf6' : '#34d399'}
                            strokeWidth={2}
                            fill={`url(#wizardGradient-${i})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg border border-border bg-bg-card p-3">
                        <div className="text-xs text-text-muted">Ann. Return</div>
                        <div className="font-semibold text-text-heading">{formatPercent(item.result.metrics.annualizedReturn)}</div>
                      </div>
                      <div className="rounded-lg border border-border bg-bg-card p-3">
                        <div className="text-xs text-text-muted">Volatility</div>
                        <div className="font-semibold text-text-heading">{formatPercent(item.result.metrics.volatility)}</div>
                      </div>
                      <div className="rounded-lg border border-border bg-bg-card p-3">
                        <div className="text-xs text-text-muted">Max DD</div>
                        <div className="font-semibold text-accent-danger">{formatPercent(item.result.metrics.maxDrawdown)}</div>
                      </div>
                      <div className="rounded-lg border border-border bg-bg-card p-3">
                        <div className="text-xs text-text-muted">Final Equity</div>
                        <div className="font-semibold text-text-heading">{formatCurrency(item.result.equity[item.result.equity.length - 1])}</div>
                      </div>
                    </div>

                    <Link
                      to={`/strategies/${strategies.find((s) => s.id === item.strategyId)?.slug}`}
                      className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-text transition hover:border-border-strong hover:text-text-heading"
                    >
                      View Strategy
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {!results && !running && (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center">
          <BarChart3 className="mx-auto h-10 w-10 text-text-muted" />
          <h3 className="mt-4 text-lg font-semibold text-text-heading">Ready to run</h3>
          <p className="mt-1 text-text-muted">Select an asset class and click Run Wizard to see the top strategies.</p>
        </div>
      )}
    </div>
  )
}
