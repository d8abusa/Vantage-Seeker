import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { strategies } from '@/data/strategies'
import { cn, formatPercent } from '@/lib/utils'
import { ArrowRightLeft, Briefcase, Plus, Target, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

interface Holding {
  strategyId: number
  weight: number
}

export function Portfolio() {
  const [holdings, setHoldings] = useState<Holding[]>([
    { strategyId: 60, weight: 20 }, // Price-momentum
    { strategyId: 128, weight: 15 }, // VIX futures basis
    { strategyId: 159, weight: 25 }, // Carry trade
    { strategyId: 105, weight: 20 }, // Trend following
    { strategyId: 95, weight: 20 }, // Convertible arb
  ])

  const [selectedId, setSelectedId] = useState<number>(strategies[0].id)

  const portfolioStrategies = useMemo(
    () =>
      holdings
        .map((h) => ({ holding: h, strategy: strategies.find((s) => s.id === h.strategyId)! }))
        .filter((x) => x.strategy),
    [holdings]
  )

  const totalWeight = holdings.reduce((sum, h) => sum + h.weight, 0)
  const isBalanced = Math.abs(totalWeight - 100) < 0.1

  const portfolioStats = useMemo(() => {
    const expectedReturn = portfolioStrategies.reduce((sum, { holding }) => sum + holding.weight * 0.08, 0)
    const expectedVol = Math.sqrt(
      portfolioStrategies.reduce((sum, { holding }) => sum + Math.pow((holding.weight / 100) * 12, 2), 0)
    )
    const sharpe = expectedVol > 0 ? (expectedReturn - 4) / expectedVol : 0
    return {
      expectedReturn,
      expectedVol,
      sharpe,
    }
  }, [portfolioStrategies])

  const pieData = portfolioStrategies.map(({ strategy, holding }) => ({
    name: strategy.name,
    value: holding.weight,
  }))

  const COLORS = ['#22d3ee', '#8b5cf6', '#34d399', '#fbbf24', '#f87171', '#3b82f6']

  const addHolding = () => {
    if (holdings.some((h) => h.strategyId === selectedId)) return
    setHoldings([...holdings, { strategyId: selectedId, weight: 0 }])
  }

  const removeHolding = (id: number) => {
    setHoldings(holdings.filter((h) => h.strategyId !== id))
  }

  const updateWeight = (id: number, weight: number) => {
    setHoldings(holdings.map((h) => (h.strategyId === id ? { ...h, weight } : h)))
  }

  const rebalanceEqual = () => {
    const equal = holdings.length > 0 ? 100 / holdings.length : 0
    setHoldings(holdings.map((h) => ({ ...h, weight: equal })))
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-heading">Portfolio Builder</h1>
          <p className="mt-1 text-text">Construct a multi-strategy allocation and analyze simulated risk/return.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isBalanced ? 'success' : 'warning'}>{totalWeight.toFixed(1)}% allocated</Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Strategy Allocation</CardTitle>
                <CardSubtitle>Adjust weights to target your risk profile</CardSubtitle>
              </div>
              <Button variant="outline" size="sm" onClick={rebalanceEqual} disabled={holdings.length === 0}>
                <Target className="h-4 w-4" />
                Equal Weight
              </Button>
            </CardHeader>

            <div className="space-y-3">
              <AnimatePresence>
                {portfolioStrategies.map(({ strategy, holding }) => (
                  <motion.div
                    key={strategy.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl border border-border bg-bg-card p-4"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-text-heading">
                          {strategy.id}. {strategy.name}
                        </div>
                        <div className="text-xs text-text-muted">{strategy.category}</div>
                      </div>
                      <button
                        onClick={() => removeHolding(strategy.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition hover:bg-accent-danger/10 hover:text-accent-danger"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={holding.weight}
                        onChange={(e) => updateWeight(strategy.id, Number(e.target.value))}
                        className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-bg-hover accent-accent"
                      />
                      <div className="w-16 text-right font-mono text-sm font-semibold text-text-heading">
                        {holding.weight.toFixed(0)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {holdings.length === 0 && (
                <div className="rounded-xl border border-dashed border-border py-12 text-center">
                  <Briefcase className="mx-auto h-10 w-10 text-text-muted" />
                  <p className="mt-3 text-text-muted">No strategies selected. Add one to start building.</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-bg-card p-4 sm:flex-row sm:items-center">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(Number(e.target.value))}
                className="h-10 flex-1 rounded-lg border border-border bg-bg px-3 text-sm text-text-heading outline-none focus:border-accent"
              >
                {strategies.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.id}. {s.name} ({s.category})
                  </option>
                ))}
              </select>
              <Button onClick={addHolding} disabled={holdings.some((h) => h.strategyId === selectedId)}>
                <Plus className="h-4 w-4" />
                Add Strategy
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Factor Exposure</CardTitle>
                <CardSubtitle>Simulated contribution by style</CardSubtitle>
              </div>
            </CardHeader>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Momentum', value: portfolioStrategies.reduce((s, { holding, strategy }) => s + (strategy.tags.includes('Momentum') ? holding.weight : 0), 0) },
                    { name: 'Value', value: portfolioStrategies.reduce((s, { holding, strategy }) => s + (strategy.tags.includes('Value') ? holding.weight : 0), 0) },
                    { name: 'Carry', value: portfolioStrategies.reduce((s, { holding, strategy }) => s + (strategy.tags.includes('Carry') ? holding.weight : 0), 0) },
                    { name: 'Volatility', value: portfolioStrategies.reduce((s, { holding, strategy }) => s + (strategy.tags.includes('Volatility') ? holding.weight : 0), 0) },
                    { name: 'Mean-Reversion', value: portfolioStrategies.reduce((s, { holding, strategy }) => s + (strategy.tags.includes('Mean-Reversion') ? holding.weight : 0), 0) },
                    { name: 'ML', value: portfolioStrategies.reduce((s, { holding, strategy }) => s + (strategy.tags.includes('Machine Learning') ? holding.weight : 0), 0) },
                  ]}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{ background: '#15171d', border: '1px solid #23262e', borderRadius: '8px' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card glow={isBalanced ? 'success' : 'accent'}>
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
              <CardSubtitle>Estimated risk/return profile</CardSubtitle>
            </CardHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-text">Expected Return</span>
                <span className={cn('font-mono font-semibold', portfolioStats.expectedReturn >= 0 ? 'text-accent-success' : 'text-accent-danger')}>
                  {formatPercent(portfolioStats.expectedReturn)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-text">Expected Volatility</span>
                <span className="font-mono font-semibold text-accent-warning">{formatPercent(portfolioStats.expectedVol)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-sm text-text">Sharpe Ratio</span>
                <span className="font-mono font-semibold text-accent">{portfolioStats.sharpe.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text">Strategies</span>
                <span className="font-mono font-semibold text-text-heading">{holdings.length}</span>
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              disabled={!isBalanced || holdings.length === 0}
            >
              <ArrowRightLeft className="h-4 w-4" />
              Simulate Rebalance
            </Button>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Allocation Chart</CardTitle>
            </CardHeader>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#15171d', border: '1px solid #23262e', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate text-text-muted">{entry.name}</span>
                  </div>
                  <span className="font-medium text-text-heading">{entry.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
