import { Card, CardHeader, CardSubtitle, CardTitle } from '@/components/ui/Card'
import { generateCorrelationMatrix, runBacktest } from '@/lib/simulation'
import { AlertTriangle, BarChart3, Shield, TrendingDown } from 'lucide-react'
import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import { motion } from 'framer-motion'

const assetNames = ['Stocks', 'Options', 'Fixed Income', 'FX', 'Commodities', 'Volatility', 'Crypto']

export function Analytics() {
  const correlation = useMemo(() => generateCorrelationMatrix(assetNames), [])
  const backtests = useMemo(() => {
    return [
      { name: 'Price Momentum', ...runBacktest(1000000, 5, 0.10, 0.18, 1).metrics },
      { name: 'VIX Basis', ...runBacktest(1000000, 5, 0.08, 0.22, 2).metrics },
      { name: 'FX Carry', ...runBacktest(1000000, 5, 0.06, 0.09, 3).metrics },
      { name: 'Trend Following', ...runBacktest(1000000, 5, 0.09, 0.16, 4).metrics },
      { name: 'Convertible Arb', ...runBacktest(1000000, 5, 0.05, 0.07, 5).metrics },
    ]
  }, [])

  const drawdownData = useMemo(() => {
    const result = runBacktest(1000000, 5, 0.10, 0.15, 7)
    return result.dates
      .map((date, i) => ({ date, drawdown: result.drawdowns[i] * 100 }))
      .filter((_, i) => i % Math.max(1, Math.floor(result.dates.length / 80)) === 0)
  }, [])

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-heading">Risk Analytics</h1>
        <p className="mt-1 text-text">Portfolio-level risk metrics, drawdown analysis, and cross-asset correlations.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Portfolio VaR (95%)', value: '-2.4%', sub: '1-day parametric', icon: AlertTriangle, color: 'text-accent-danger' },
          { label: 'Expected Shortfall', value: '-3.7%', sub: 'CVaR 95%', icon: TrendingDown, color: 'text-accent-warning' },
          { label: 'Beta to S&P 500', value: '0.31', sub: 'Low market exposure', icon: BarChart3, color: 'text-accent-success' },
          { label: 'Stress Loss', value: '-12.8%', sub: '2008-like scenario', icon: Shield, color: 'text-accent' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader>
                  <div>
                    <CardSubtitle>{stat.label}</CardSubtitle>
                    <div className={`mt-1 text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="mt-1 text-xs text-text-muted">{stat.sub}</div>
                  </div>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Strategy Simulation Comparison</CardTitle>
              <CardSubtitle>Annualized return vs volatility</CardSubtitle>
            </div>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={backtests} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: '#15171d', border: '1px solid #23262e', borderRadius: '8px' }}
                />
                <Bar dataKey="annualizedReturn" name="Ann. Return" radius={[4, 4, 0, 0]}>
                  {backtests.map((_, i) => (
                    <Cell key={i} fill={['#22d3ee', '#8b5cf6', '#34d399', '#fbbf24', '#f87171'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Drawdown History</CardTitle>
              <CardSubtitle>Peak-to-trough underwater curve</CardSubtitle>
            </div>
          </CardHeader>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={drawdownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(v) => v.slice(0, 7)} minTickGap={30} />
                <YAxis tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: '#15171d', border: '1px solid #23262e', borderRadius: '8px' }}
                  formatter={(v) => [`${Number(v).toFixed(2)}%`, 'Drawdown']}
                />
                <Bar dataKey="drawdown" fill="#f87171" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Cross-Asset Correlation Matrix</CardTitle>
            <CardSubtitle>Estimated pairwise correlations across major sleeves</CardSubtitle>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid" style={{ gridTemplateColumns: `repeat(${assetNames.length + 1}, minmax(0, 1fr))` }}>
              <div className="p-2 text-xs font-semibold text-text-muted"></div>
              {assetNames.map((name) => (
                <div key={name} className="p-2 text-center text-xs font-semibold text-text-heading">
                  {name}
                </div>
              ))}
              {assetNames.map((row, i) => (
                <>
                  <div key={`row-${row}`} className="p-2 text-xs font-semibold text-text-heading">
                    {row}
                  </div>
                  {assetNames.map((_, j) => {
                    const val = correlation[i][j]
                    return (
                      <div
                        key={`${i}-${j}`}
                        className="m-0.5 flex items-center justify-center rounded-md p-2 text-xs font-mono"
                        style={{
                          background:
                            i === j
                              ? 'rgba(34, 211, 238, 0.2)'
                              : val > 0
                              ? `rgba(52, 211, 153, ${Math.abs(val) * 0.4})`
                              : `rgba(248, 113, 113, ${Math.abs(val) * 0.4})`,
                          color: i === j ? '#22d3ee' : val > 0 ? '#34d399' : '#f87171',
                        }}
                      >
                        {val.toFixed(2)}
                      </div>
                    )
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
